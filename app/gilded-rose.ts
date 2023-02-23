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

export abstract class UpdateQualityStrategy {
  getNextQuality(sellin:number, quality:number): number {
    if (quality===0) return 0;
    if (sellin>0) return quality - 1;
    return Math.max(quality - 2, 0);
  }
}

export const passes = 'Backstage passes to a TAFKAL80ETC concert';
export const sulfurasHandOfRagnaros = "Sulfuras";
export const agedBrie = 'Aged Brie';

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    const notSulfurasItems = this.items.filter(it => it.name!==sulfurasHandOfRagnaros);


    notSulfurasItems.forEach(item => {
      let diff=0;
        switch (item.name) {
        case agedBrie :
            item.quality = Math.min(item.quality +1, 50);
          break;

        case passes :
          if(item.sellIn > 10 )
            item.quality = Math.min(item.quality +1, 50);
          else if(item.sellIn > 5 )
            item.quality = Math.min(item.quality +2, 50);
          else if(item.sellIn > 0 )
            item.quality = Math.min(item.quality +3, 50);
          else item.quality = 0;

          break;

        default:
          if(item.sellIn>0) {
            item.quality = Math.max(item.quality - 1, 0);
          } else {
            item.quality = Math.max(item.quality - 2, 0);
          }
          break;
      }
      item.sellIn = item.sellIn - 1;

    });

    return this.items;
  }
}

