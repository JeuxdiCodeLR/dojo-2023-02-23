export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class ConjuredItem extends Item{
  constructor(name, sellIn, quality) {
    super(name, sellIn, quality);
  }
}

export abstract class UpdateQualityStrategy {
  getNextQuality(sellin: number, quality: number): number {
    if (quality === 0) return 0;
    if (sellin > 0) return quality - 1;
    return Math.max(quality - 2, 0);
  }
}

export const passes = 'Backstage passes to a TAFKAL80ETC concert';
export const sulfurasHandOfRagnaros = "Sulfuras";
export const agedBrie = 'Aged Brie';

function diffQualityPasses(item: Item):number {
  let diffQuality = 0;
  if (item.sellIn > 10)
    diffQuality = 1;
  else if (item.sellIn > 5)
    diffQuality = 2;
  else if (item.sellIn > 0)
    diffQuality = 3;
  else diffQuality = -item.quality;
  return diffQuality;
}

function diffQualityDefault(item: Item) {
  if (item.sellIn > 0) {
    return -1;
  } else {
    return -2;
  }
}
function diffQualityAgedBrie(item:Item){
  return 1;
}

type qualityFn = (Item) => number;

const diffQualityMap:{[key: string]: qualityFn} = {
 [agedBrie]: diffQualityAgedBrie,
  [passes]: diffQualityPasses,
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    const notSulfurasItems = this.items.filter(it => it.name !== sulfurasHandOfRagnaros);

    notSulfurasItems.forEach(item => {
      let diffQuality = 0;
      let multQuality = 1;

      const diffQualityFn = diffQualityMap[item.name] ?? diffQualityDefault;
      diffQuality = diffQualityFn(item);

      if(diffQuality < 0 && item instanceof ConjuredItem) {
        multQuality = 2;
      }
      item.sellIn = item.sellIn - 1;
      item.quality = Math.max(0, Math.min(item.quality + diffQuality * multQuality, 50));
    });

    return this.items;
  }
}

