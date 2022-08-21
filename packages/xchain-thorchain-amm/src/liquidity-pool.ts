import { PoolDetail } from '@xchainjs/xchain-midgard/lib'
import { Asset, BaseAmount, Chain, assetFromString, baseAmount } from '@xchainjs/xchain-util'
import { BigNumber } from 'bignumber.js'

/**
 * Represent a Liquidity Pool in Thorchain
 */
export class LiquidityPool {
  private pool: PoolDetail
  readonly assetBalance: BaseAmount
  readonly runeBalance: BaseAmount

  readonly asset: Asset
  readonly assetString: string
  readonly runeToAssetRatio: BigNumber
  readonly assetToRuneRatio: BigNumber

  constructor(pool: PoolDetail) {
    this.pool = pool
    const asset = assetFromString(this.pool.asset)
    if (!asset) throw new Error(`could not parse ${this.pool.asset}`)

    this.asset = asset
    this.assetString = this.pool.asset
    this.assetBalance = baseAmount(this.pool.assetDepth)
    this.runeBalance = baseAmount(this.pool.runeDepth)

    this.runeToAssetRatio = this.runeBalance.amount().div(this.assetBalance.amount())
    this.assetToRuneRatio = this.assetBalance.amount().div(this.runeBalance.amount())
    if (this.asset.chain === Chain.Avalanche) console.log(JSON.stringify(this, null, 2))
  }
  isAvailable(): boolean {
    return this.pool.status.toLowerCase() === 'available'
  }
}
