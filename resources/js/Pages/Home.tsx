import { Home } from "@/Components/home";
import { HeaderGuard } from "@/Layouts/Header/Guard";
import { PageWithLayout } from "@/app";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";


const HomePage: PageWithLayout = (props: PageProps) =>{
  
  return (
    <Home />
  )
}

HomePage.layout = page => (
  <>
  <Head>
    <meta charSet="utf-8" />
    <title>PlumeBooks | Get your books</title>
  </Head>
  <HeaderGuard />
    { page }
  </>
)


export default HomePage