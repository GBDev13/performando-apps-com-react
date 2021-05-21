import { memo, useState } from "react"
import dynamic from 'next/dynamic'
import { AddProductToWishlistProps } from "./AddProductToWishlist";

const AddProductToWishlist = dynamic<AddProductToWishlistProps>(() => {
  // return import('./AddProductToWishlist') Quando é export default
  return import('./AddProductToWishlist').then(mod => mod.AddProductToWishlist); //Quando não é export default
}, {
  loading: () => <span>Carregando...</span>
});

interface ProductItemProps {
  product: {
    id: number;
    price: number;
    priceFormatted: number;
    title: string;
  }
  onAddToWishList: (id: number) => void;
}

function ProductItemComponent({ product, onAddToWishList }: ProductItemProps) {
  const [isAddingToWishList, setIsAddingToWishList] = useState(false);

  return (
    <div>
      {product.title} - <strong>{product.priceFormatted}</strong>
      <button onClick={() => setIsAddingToWishList(true)}>Adicionar aos favoritos</button>

      { isAddingToWishList && (
        <AddProductToWishlist
          onAddToWishList={() => onAddToWishList(product.id)}
          onRequestClose={() => setIsAddingToWishList(false)}
        />
      )}
    </div>
  )
}

export const ProductItem =  memo(ProductItemComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.product, nextProps.product) // pesado caso sejam mts props
})

/**
Quando o componente depende totalmente das props para a atualização,
o memo funciona perfeitamente

O segundo parâmetro dele (NAO OBRIGATÓRIO), é uma função contento o motivo
que satisfaça a verificação renderizar novamente
 */

/**
 * 1. Pure Functional Components (Componentes que só server para dividir a interface)
 * 2. Componentes que renderizam demais
 * 3. Re-renders with same props
 * 4. Medium to big size (Componentes maiores, com muita coisa)
 */


/**
 * useMemo
 * 1. Cálculos pesados
 * 2. Igualdade referencial (quando a gente repassa aquela informação a um componente filho)
 */

/**
 * Formatação de dados
 * 1. Sempre formatar os dados na hora de pega-los da API.
 * 2. Evitar ao máximo formatar algo diretamente no return do JSX
 */

/**
 * Dynamic import (Code Splitting) ou Lazy loading (No react se importa 'lazy' no next 'dynamic')
 * 1. Mostrar algo que use algo externa (tanto biblioteca como algo local), apenas se o usuário fazer algo (clicar em algo, abrir um modal)
 */

/**
 * Virtualização
 * 1. É necessário usar alguma biblioteca para não criar tudo do zero, como preferência pessoal 'react-virtualized'
 * 2. Usado quando existem grandes listas, tanto de linhas como colunas. Ela virtualiza o scroll para melhor performance
 */

/**
 * Bundle analyser
 * 1. Usado pra ver quanto uma aplicação está usando em nosso app.
 */