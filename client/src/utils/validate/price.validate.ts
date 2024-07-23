import * as Yup from 'yup'

function testPriceMinMax(this: Yup.TestContext<Yup.AnyObject>) {
  const { price_min, price_max } = this.parent as {
    price_min: string
    price_max: string
  }
  if (price_min !== '' && price_max !== '') return Number(price_min) <= Number(price_max)
  return price_min !== '' || price_max !== ''
}

/**
 * Note: default must has init value (not undifined) to work with createSearchParams
 */
export const PriceSchema = Yup.object().shape({
  price_min: Yup.string().default('').test({
    name: 'price-not-allowed',
    message: 'Giá không phù hợp',
    test: testPriceMinMax
  }),

  price_max: Yup.string().default('').test({
    name: 'price-not-allowed',
    message: 'Giá không phù hợp',
    test: testPriceMinMax
  })
})

export type PriceSchemaType = Yup.InferType<typeof PriceSchema>
