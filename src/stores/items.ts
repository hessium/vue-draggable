/*
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useItemsStore = defineStore('items', () => {
  const items = ref(null)
  const isLoading = ref(false)
  const error = ref(null)
  async function getItems() {
    isLoading.value = true;
    try {
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

  return { items, error, isLoading, getItems}
})


import { defineStore } from 'pinia';
*/


import {defineStore} from "pinia";


export const useItemsStore = defineStore('itemsStore', {
  state: () => ({
    items: [],
    isLoading : false,
    error: null
  }),
  actions: {
    async getItems() {
      this.isLoading = true
      try {
        if( JSON.parse(<string>localStorage.getItem('items')).length >= 1) {
          return  this.items = JSON.parse(<string>localStorage.getItem('items'));
        }
        const res = await fetch("src/db.json");
        const data = await res.json();
        localStorage.setItem('items', JSON.stringify(data));
        this.items = JSON.parse(<string>localStorage.getItem('items'));
      } catch (error) {
        return this.error = error;
      } finally {
        this.isLoading = false;
      }
    },
    changeItems(newItems)  {
      localStorage.setItem('items', JSON.stringify(newItems));
      this.items = JSON.parse(<string>localStorage.getItem('items'));
    }
  },
})