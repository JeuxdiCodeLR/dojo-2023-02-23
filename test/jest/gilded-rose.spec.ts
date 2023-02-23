import {agedBrie, GildedRose, Item, passes, sulfurasHandOfRagnaros} from '@/gilded-rose';

function getGildedRose(tableau ? : Item[]) {
  if (tableau)
    return new GildedRose(tableau)
  return new GildedRose([
    new Item('Foo', 0, 0),
    new Item('Bar', 0, 0),
    new Item('Bar', 1, 0),
    new Item(agedBrie, 0, 0),
    new Item(agedBrie, 10, 10),
    new Item(agedBrie, 10, 50),
    new Item(passes, 0, 0),
    new Item(passes, 10, 20),
    new Item(sulfurasHandOfRagnaros, 15, 80),
  ]);
}

describe('Gilded Rose', () => {
  it('aucune qualité inférieure à 0', () => {
    const gildedRose = getGildedRose();
    gildedRose.items.map((it) => {
      expect(it.quality).toBeGreaterThanOrEqual(0);
    })
    gildedRose.updateQuality();
    gildedRose.items.map((it) => {
      expect(it.quality).toBeGreaterThanOrEqual(0);
    })
  });

  it('qualité sulfuras toujours à 80', () => {
    const gildedRose = getGildedRose();
    const sulfurasItems = gildedRose.items.filter((item) => {
      return item.name === sulfurasHandOfRagnaros
    })

    expect(sulfurasItems.length).toBeGreaterThan(0)

    sulfurasItems.map((it) => {
      expect(it.quality).toEqual(80);
    })

    gildedRose.updateQuality();

    sulfurasItems.map((it) => {
      expect(it.quality).toEqual(80);
    })
  });

  it('sellin sulfuras ne diminue pas', () => {
    const gildedRose = getGildedRose(
      [
        new Item(sulfurasHandOfRagnaros, 15, 80),
      ]
    );

    gildedRose.updateQuality();
      expect(gildedRose.items[0].sellIn).toEqual(15);
  });


  it('qualité toujours au plus 50 sauf sulfuras', () => {
    const gildedRose = getGildedRose();
    const notSulfurasItems = gildedRose.items.filter((item) => {
      return item.name !== sulfurasHandOfRagnaros
    })

    expect(notSulfurasItems.length).toBeGreaterThan(0)

    notSulfurasItems.map((it) => {
      expect(it.quality).toBeLessThanOrEqual(50);
    })

    gildedRose.updateQuality();

    notSulfurasItems.map((it) => {
      expect(it.quality).toBeLessThanOrEqual(50);
    })
  });

  it('qualité diminue', () => {
    let tableau = [
      new Item('Foo', 1, 20),
    ];
    const gildedRose = getGildedRose(tableau);

    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toEqual(19);

    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toEqual(17);

  });

  it('sellin diminue', () => {
    let tableau = [
      new Item('Foo', 1, 20),
    ];
    const gildedRose = getGildedRose(tableau);

    gildedRose.updateQuality();
    expect(gildedRose.items[0].sellIn).toEqual(0);

    gildedRose.updateQuality();
    expect(gildedRose.items[0].sellIn).toEqual(-1);

  });

  it('qualité du brie', () => {
    let tableau = [
      new Item(agedBrie, 1, 49),
    ];
    const gildedRose = getGildedRose(tableau);

    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toEqual(50);

    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toEqual(50);

  });

  it('qualité du passes a sellin egal 10', () => {
    let tableau = [
      new Item(passes, 11, 20),
    ];
    const gildedRose = getGildedRose(tableau);

    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toEqual(21);

    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toEqual(23);
  });

  it('qualité du passes a sellin egal 5', () => {
    let tableau = [
      new Item(passes, 6, 20),
    ];
    const gildedRose = getGildedRose(tableau);

    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toEqual(22);

    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toEqual(25);
  });

  it('qualité du passes a sellin egal 0', () => {
    let tableau = [
      new Item(passes, 1, 20),
    ];
    const gildedRose = getGildedRose(tableau);

    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toEqual(23);

    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toEqual(0);
  });

  xit('conjured item voit qualité diminuer', () => {
    let tableau = [
      new Item(passes, 1, 20),
    ];
    const gildedRose = getGildedRose(tableau);

    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toEqual(23);

    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toEqual(0);
  });


});
