import { useMemo } from "react"
import { List, ListRowRenderer } from "react-virtualized"
import { ProductItem } from "./ProductItem"

interface SearchResultsProps {
  totalPrice: number;
  results: Array<{
    id: number;
    price: number;
    priceFormatted: number;
    title: string;
  }>
  onAddToWishList: (id:number) => void;
}

export function SearchResults({ totalPrice, results, onAddToWishList }: SearchResultsProps) {

  // Uso do useMemo

  // const totalPrice = useMemo(() => {
  //   return results?.reduce((total, product) => {
  //     return total + product.price
  //   }, 0)
  // }, [results])

  const rowRender: ListRowRenderer = ({ index, key, style }) => {
    return (
      <div key={key} style={style}>
      <ProductItem
        product={results[index]}
        onAddToWishList={onAddToWishList}
      />
      </div>
    )
  }

  return (
    <div>
      <h2>{totalPrice}</h2>

      <List
        height={300}
        rowHeight={30}
        width={900}
        overscanRowCount={5}
        rowCount={results.length}
        rowRenderer={rowRender}
      />

    </div>
  )
}