import { usePageProps } from "@/Hooks/usePageProps"
import { 
  Author,
  BookWrapper, 
  ContentContainer, 
  Description, 
  DescriptionWrapper, 
  Image, 
  ImageWrapper, 
  MainWrapper, 
  Price, 
  Stocks, 
  Title} from "./book.styled"
import { Book as BookType } from "@/store"
import { PageProps } from "@/types"


type BookPageProps = PageProps & {
  book: BookType
}

const Book = () => {
  const { book } = usePageProps<BookPageProps>()

  return (
    <MainWrapper>
      <BookWrapper>
        <ImageWrapper>
          <Image
            src={ `/storage/books/${ book.image }` }
            alt={ book.title } />
        </ImageWrapper>
        <ContentContainer>
          <Title>{ book.title }</Title>
          <Author>
            <span>by: </span>
            { book.author }
          </Author>
          <Price>₱{ book.price.toFixed(2) }</Price>
          <Stocks>
            <span>In stock: </span>
            Only { book.stocks } left
          </Stocks>
          <DescriptionWrapper>
            <h2>Book description:</h2>
            <Description>{ book.description }</Description>
          </DescriptionWrapper>
        </ContentContainer>
      </BookWrapper>
    </MainWrapper>
  )
}


export default Book