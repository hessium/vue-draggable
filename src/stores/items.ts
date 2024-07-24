import { ref } from 'vue'
import { defineStore } from 'pinia'

const db = [
  {
    "name" : "item 1",
    "desc" : "But I must explain to you how all this mistaken idea of denouncing pleasure",
    "id" : 1,
    "count" : 3
  },
  {
    "name" : "item 2",
    "desc" : "But I must explain to you how all this mistaken idea of denouncing pleasure",
    "id" : 2,
    "count" : 4
  },
  {
    "name" : "item 3",
    "desc" : "But I must explain to you how all this mistaken idea of denouncing pleasure",
    "id" : 3,
    "count" : 1
  },
  {}, {}, {}, {}, {}, {}, {}, {}, {},
  {}, {}, {}, {}, {}, {}, {}, {}, {},
  {}, {}, {}, {}
]

export const useItemsStore = defineStore('items', () => {

  const items = ref<Array<any>[]>([])
  const isLoading = ref<boolean>(false)
  const error = ref< any | null>(null)

  function getItems() {
    isLoading.value = true;
    try {
      if( localStorage.getItem('items') !== null) {
        return  items.value = JSON.parse(<string>localStorage.getItem('items'));
      }
      localStorage.setItem('items', JSON.stringify(db));
      items.value = JSON.parse(<string>localStorage.getItem('items'));
    } catch (error: any) {
      return error.value = error;
    } finally {
      isLoading.value = false;
    }
  }
  function changeItems(newItems: Array<any>)  {
    localStorage.setItem('items', JSON.stringify(newItems));
    items.value = JSON.parse(<string>localStorage.getItem('items'));
  }

  function changeItemCount(id: any, model: any)  {
     items.value.forEach((item: any) => {
       if(!item){return}
        if (item.id === id) {
          item.count = model
          if(item.count <= 0) {
            item.name = ""
            item.desc = ""
            item.id = ""
            item.count = ""
          }
        }
     })
      localStorage.setItem('items', JSON.stringify(items.value));
  }

  return { items, error, isLoading, getItems, changeItems, changeItemCount}
})