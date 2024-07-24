<template>
  <div class="wrap">
    <draggable
        v-model="myArray"
        class="rows"
        group=""
        @start="drag=true"
        @end="changeItems(myArray)"
        item-key="id">
      <template  #item="{element}">
        <div class="item">
          <div class="item__content" v-show="element.name" @click="onPopupShow(element)">
            {{element.name}}
          </div>
        </div>
      </template>
    </draggable>
    <transition name="fade">
      <div v-show="popupShow" class="popup">
        <button class="popup__close" @click="onPopupHide">
          Закрыть
        </button>
        <div>
          {{selectedItem?.name}}
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import {useItemsStore} from "@/stores/items";
import {onMounted, ref, watch} from "vue";
import draggable from 'vuedraggable';

const itemsStore = useItemsStore();
const myArray = ref([]);

itemsStore.getItems();
myArray.value = itemsStore.items;
onMounted(() => {
  itemsStore.getItems();
  myArray.value = itemsStore.items;
})
watch(
    () => itemsStore.items,
    () => myArray.value = itemsStore.items
)

const selectedItem = ref(null);
const popupShow = ref(false);

const changeItems = (newItems) => {
  itemsStore.changeItems(newItems)
}

const log = (event) => {
  console.log(myArray.value)
  console.log(event)
}

const onPopupShow = (item) => {
  popupShow.value = true;
  selectedItem.value = {...item};
}

const  onPopupHide = () => {
  popupShow.value = false;
  selectedItem.value = null;
}

const openPopup = (item) => {
  popupShow.value = true
  selectedItem.value = {...item}
}

</script>

<style>

body {
  background-color: rgba(29, 29, 29, 1);
  min-height: 100dvh;
}
.wrap {
  display: flex;
  flex-direction: column;
  gap: 4rem;
  position: relative;
}
.rows {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
}

.item {
  border: 1px solid rgba(77, 77, 77, 1);
  height: 100px;
  color: white;
}
.item__content {
  width: 100%;
  height: 100%;
}

.popup {
  position: absolute;
  top: 0;
  right: 0;
  width:30rem;
  height: 100%;
  z-index: 10;
  background-color: rgba(38, 38, 38, 0.5);
  flex-direction: column;
  justify-content: flex-start;
  padding: 4rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(100%);
  transition: opacity 0.4s ease, transform 0.4s ease;
}
</style>
