import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useItemsStore = defineStore('items', () => {
  const items = ref<typeof Array[]>([])
  const isLoading = ref< Boolean>(false)
  const error = ref<typeof Object | null >(null)
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
    } catch (error) {
      return error.value = error;
    } finally {
      isLoading.value = false;
    }
  }

  function changeItems(newItems)  {
    localStorage.setItem('items', JSON.stringify(newItems));
    items.value = JSON.parse(<string>localStorage.getItem('items'));
  }


  function changeItemCount(id, model)  {
     items.value.forEach((item: Object) => {
      if (item.id === id) {
        item.count = model
        if(item.count <= 0) {
          item.count = ''
          item.name = ''
          item.id = ''
          item.desc = ''
        }
      }
    })
    localStorage.setItem('items', JSON.stringify(items.value));
  }

  return { items, error, isLoading, getItems, changeItems, changeItemCount}
})