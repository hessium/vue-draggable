import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useItemsStore = defineStore('items', () => {

  const items = ref<Array<any>[]>([])
  const isLoading = ref<boolean>(false)
  const error = ref< any | null>(null)

  async function getItems() {
    isLoading.value = true;
    try {
      if( localStorage.getItem('items') !== null) {
        return  items.value = JSON.parse(<string>localStorage.getItem('items'));
      }
      const res = await fetch('src/db.json');
      const data = await res.json();
      localStorage.setItem('items', JSON.stringify(data));
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