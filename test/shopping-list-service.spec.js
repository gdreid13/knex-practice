const ShoppingListService = require('../src/shopping-list-service')
const knex = require('knex')

describe(`Shopping list service object`, function () {
  let db
  let testItems = [
    {
      id: 1,
      name: 'Fish tricks',
      price: '13.10',
      date_added: new Date('2029-01-22T16:28:32.615Z'),
      checked: false,
      category: 'Main'
    },
    {
      id: 2,
      name: 'Not Dogs',
      price: '4.99',
      date_added: new Date('2100-05-22T16:28:32.615Z'),
      checked: true,
      category: 'Snack'
    },
    {
      id: 3,
      name: 'SubstiTuna Salad',
      price: '1.24',
      date_added: new Date('1919-12-22T16:28:32.615Z'),
      checked: false,
      category: 'Lunch'
    },
  ]
  before(() => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    })    
  })

  before(() => db('shopping_list').truncate())

  afterEach(() => db('shopping_list').truncate())

  after(() => db.destroy())

  context(`Given 'shopping_list' has data`, () => {
    beforeEach(() => {
      return db
        .into('shopping_list')
        .insert(testItems)
    })

    it(`deleteItem() removes an item by id from 'shopping_list' table`, () => {
      const ItemId = 3
      return ShoppingListService.deleteItem(db, ItemId)
        .then(() => ShoppingListService.getAllItems(db))
        .then(allItems => {
          const expected = testItems.filter(Item => Item.id !== ItemId)
          expect(allItems).to.eql(expected)
        })
    })

    it(`getById() resolves an item by id from 'shopping_list' table`, () => {
      const thirdId = 3
      const thirdTestItem = testItems[thirdId - 1]
      return ShoppingListService.getById(db, thirdId)
        .then(actual => {
          expect(actual).to.eql({
            id: thirdId,
            category: thirdTestItem.category,
            checked: thirdTestItem.checked,
            date_added: thirdTestItem.date_added,
            name: thirdTestItem.name,
            price: thirdTestItem.price,
          })
        })
    })

    it(`getAllItems() resolves all items from 'shopping_list' table`, () => {
      return ShoppingListService.getAllItems(db)
        .then(actual => {
          expect(actual).to.eql(testItems)
        })
    })

    it(`updateItem() updates an Item from the 'shopping_list' table`, () => {
      const idOfItemToUpdate = 3
      const newItemData = {
        category: 'Breakfast',
        checked: true,
        date_added: new Date(),
        name: 'Updated item',
        price: '10.00',
      }
      return ShoppingListService.updateItem(db, idOfItemToUpdate, newItemData)
        .then(() => ShoppingListService.getById(db, idOfItemToUpdate))
        .then(item => {
          expect(item).to.eql({
            id: idOfItemToUpdate,
            ...newItemData,
          })
        })
    })
    
  })

  context(`Given 'shopping_list' has no data`, () => {
    it(`getAllItems() resolves an empty array`, () => {
      return ShoppingListService.getAllItems(db)
        .then(actual => {
          expect(actual).to.eql([])
        })
    })


    it(`insertItem() inserts an Item and resolves the Item with an 'id'`, () => {
      const newItem = {
        category: 'Breakfast',
        checked: true,
        date_added: new Date('2020-01-01T00:00:00.000Z'),
        name: 'Test new item',
        price: '10.00',
      }
      return ShoppingListService.insertItem(db, newItem)
        .then(actual => {
          expect(actual).to.eql({
            id: 1,
            category: newItem.category,
            checked: newItem.checked,
            date_added: newItem.date_added,
            name: newItem.name,
            price: newItem.price,
          })
        })
    })
  })
})