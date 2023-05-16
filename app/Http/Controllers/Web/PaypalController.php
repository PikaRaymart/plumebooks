<?php
namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Http\Resources\Web\BookCollection;
use App\Http\Resources\Web\BookResource;
use App\Http\Resources\Web\CartBookCollection;
use App\Models\Book;
use App\Models\Cart;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Srmklive\PayPal\Services\PayPal as PayPalClient;

class PayPalController extends Controller{

	// showing the paypal ui
	public function checkout(Request $request){
    $book = Book::where('id', $request->bookId)->first();
		$order = [
			"quantity" => $request->quantity,
			"book" => $book
		];

		if (!$book) return redirect("/books/{$book->id}")->withErrors([ "error" => "No book found with this id." ]);

		if ($request->quantity > $book->stocks) return redirect("/books/{$book->id}")->withErrors([ "error" => "Quantity exceeds book's stock." ]);

		$response = paypalCreateOrder([$order], "checkoutSuccessTransaction", "checkoutCancelTransaction");

		if (isset($response['id']) && $response['id'] != null) {
			foreach ($response['links'] as $links) {
				if ($links['rel'] == 'approve') {
          return Inertia::location($links["href"]);
				}
			}
			return redirect("cart")->with("success", "Success");
		} else {
			return redirect("cart")->with("success", "Success");
		}
	}

	function checkoutCart() {
		$customer = authenticatedCustomer();
    $cart = $customer->carts()->with("books")->get()->toArray();
		$provider = new PayPalClient();
		$provider->setApiCredentials(config('paypal'));
		$paypalToken = $provider->getAccessToken();
		$response = $provider->createOrder([
			"intent" => "CAPTURE",
			"application_context" => [
				"return_url" => route('checkoutSuccessTransaction'),
				"cancel_url" => route('checkoutCancelTransaction'),
			],
			"purchase_units" => [
				0 => [
					"amount" => [
						"currency_code" => "PHP",
						"value" => array_reduce($cart, function($accu, $curr) {
              return $accu + $curr["books"][0]["price"] * $curr["quantity"];
            }, 0) + 50,
            "breakdown" => [
              "item_total" => [
                "currency_code" => "PHP",
                "value" => array_reduce($cart, function($accu, $curr) {
                  return $accu + $curr["books"][0]["price"] * $curr["quantity"];
                }, 0),
              ],
              "shipping" => [
                "currency_code" => "PHP",
                "value" => "50"
              ]
            ]
          ],
          "items" => array_map(function($singleCart) {
            return [
              "name" => $singleCart["books"][0]["title"],
              "unit_amount" => [
                "currency_code" => "PHP",
                "value" => $singleCart["books"][0]["price"]
              ],
              "quantity" => $singleCart["quantity"]
            ];
          }, $cart)
				]
			]
		]);

		if (isset($response['id']) && $response['id'] != null) {
			foreach ($response['links'] as $links) {
				if ($links['rel'] == 'approve') {
          return Inertia::location($links["href"]);
				}
			}
			return redirect("cart")->with("success", "Success");
		} else {
			return redirect("cart")->with("success", "Success");
		}
	}

	// redirect for a successfull transaction
	public function checkoutSuccessTransaction(Request $request){
		$provider = new PayPalClient;
		$provider->setApiCredentials(config('paypal'));
		$provider->getAccessToken();
		$response = $provider->capturePaymentOrder($request['token']);
		$customer = authenticatedCustomer();
    $cart = $customer->carts()->with("books")->get();

		if (isset($response['status']) && $response['status'] == 'COMPLETED') {

			// // check first if cart quantity overflows the book stocks
			// foreach ($cart as $cartItem) {
			// 	$book = Book::findOrFail($cartItem->books[0]->id);

			// 	if ($cartItem->quantity > $book->stocks) {
			// 		return redirect("cart")->with("failure", "Book quantity overflows the original stocks. Check your cart.");
			// 	}
			// }

			// // deduct all the cart quantity for each of the book
			// foreach ($cart as $cartItem) {
			// 	$book = Book::findOrFail($cartItem->books[0]->id);
			// 	$book->stocks -= $cartItem->quantity;
			// 	$book->save();
			// }

			// Cart::where("customer_id", $customer->id)->delete();

			return redirect("cart")->with("success", "Checkout successfully. Thank you!");
		} else {

			return redirect("cart")->with("failure", "Checkout unsuccessfully. Please try again.");
		}
	}

	// redirect for cancellation of the paypal
	public function checkoutCancelTransaction(Request $request){
		return redirect()->route("cart");
	}
}