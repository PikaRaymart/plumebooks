import { 
  BookInfoContainter,
  Category,
  Image,
  List, 
  ListItem, 
  Status, 
  Stocks, 
  Table, 
  TableHead, 
  TableRow, 
  Title, 
  Wrapper } from "./books.styled"
import { BooksPaginator } from "@/Components/paginator"
import { Link } from "@inertiajs/react"
import { useDetectResponsiveness } from "@/Hooks/useDetectResponsiveness"
import { usePageProps } from "@/Hooks/usePageProps"
import { AdminPageProps } from "@/Pages/Admin"


const Books = () =>{
  const { books } = usePageProps<AdminPageProps>()
  const isMobile = useDetectResponsiveness()

  const renderBooksList = () => {
    const mappedBooks = books.data.map(book => (
      <ListItem key={ book.title }>
        { book.image && (
          <Image
            src={ `storage/books/${ book.image }` }
            alt={ book.title }  />
        ) }
        <BookInfoContainter>
          <Title>
            <Link href={ `/admin/edit/${ book.id }` }>{ book.title }</Link>
          </Title>
          <Category>{ book.category }</Category>
          <Stocks>{ book.stocks } stocks left</Stocks>
        </BookInfoContainter>
        <Status isActive={ book.status }>{ book.status }</Status>
      </ListItem>
    ))
    
    return mappedBooks
  }

  const renderBooksTableBody = () =>{
    const mappedBooks = books.data.map(book => (
      <TableRow key={ book.title }>
        <td>
          <input 
            type="checkbox"
            id={ `${ book.id }` }
            name={ `${ book.id }` } />
        </td>
        <td>
          { book.image && (
            <Image
            src={ `storage/books/${ book.image }` }
            alt={ book.title } />
          ) }
        </td>
        <td>
          <Title>
            <Link href={ `/admin/edit/${ book.id }` }>{ book.title }</Link>
          </Title>
        </td>
        <td>
          <Category>{ book.category }</Category>
        </td>
        <td>
          <Status isActive={ book.status }>{ book.status }</Status>
        </td>
        <td>
          <Stocks >{ book.stocks } stocks left</Stocks>
        </td>
      </TableRow>
    ))

    return mappedBooks
  }

  return (
    <Wrapper>
      { isMobile && (
        <List>
          { renderBooksList() }
        </List>
      ) }
      { !isMobile && (
        <Table>
          <TableHead>
            <tr>
              <th>
                <input
                  id="select-all"
                  name="select-all" 
                  type="checkbox" />
              </th>
              <th></th>
              <th>Book</th>
              <th>Category</th>
              <th>Status</th>
              <th>Inventory</th>
            </tr>
          </TableHead>
          <tbody>
            { renderBooksTableBody() }
          </tbody>
        </Table>
      ) }
      <BooksPaginator />
    </Wrapper>
  )
}


export default Books