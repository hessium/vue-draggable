<template>
  <div class="container">
    <div class="content">
      <div class="skeleton-item">
        <div class="skeleton-item__img">
          <img :src="skeleton" alt="">
        </div>
        <div class="skeleton-item__name skeleton-item__hide">3132132131212</div>
        <div class="skeleton-item__desc skeleton-item__hide">
          3213213
        </div>
        <div class="skeleton-item__desc skeleton-item__hide">
          3132132131231321312
        </div>
        <div class="skeleton-item__desc skeleton-item__hide">321321321321321</div>
        <div class="skeleton-item__desc skeleton-item__hide">13213121122</div>
      </div>
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
                <div class="item__img"></div>
                <span class="item__count">
                {{element.count}}
              </span>
              </div>
            </div>
          </template>
        </draggable>
        <transition name="fade">
          <div v-show="popupShow" class="popup">
            <button class="popup__close" @click="onPopupHide">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 7.05L16.95 6L12 10.95L7.05 6L6 7.05L10.95 12L6 16.95L7.05 18L12 13.05L16.95 18L18 16.95L13.05 12L18 7.05Z" fill="white"/>
              </svg>
            </button>
            <div class="popup__content">
              <div class="popup__img--wrapper">
                <div class="popup__img">
                </div>
              </div>
              <div class="popup__text">
                <div class="skeleton-item__hide skeleton-item__name">{{selectedItem?.name}}</div>
                <p class="skeleton-item__hide skeleton-item__desc">
                  {{selectedItem?.desc}}
                </p>
              </div>
              <button class="popup__btn popup__btn--delete" v-show="!showButtons" @click="onShowButtons">
                Удалить
              </button>
              <div class="popup__actions"  v-show="showButtons">
                <input type="number" placeholder="Введите количество" class="popup__input" v-model="model">
                <div class="popup__buttons">
                  <button class="popup__btn" @click="onHideButtons">
                    Отмена
                  </button>
                  <button class="popup__btn popup__btn--delete" @click="changeItems(selectedItem.id)">
                      Подтвердить
                  </button>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
    <div class="skeleton-wrap">
      <button class="skeleton-wrap__close">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M18 7.05L16.95 6L12 10.95L7.05 6L6 7.05L10.95 12L6 16.95L7.05 18L12 13.05L16.95 18L18 16.95L13.05 12L18 7.05Z" fill="white"/>
        </svg>
      </button>
      <div class="skeleton-block">

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useItemsStore} from "@/stores/items";
import {onMounted, ref, watch} from "vue";
import draggable from 'vuedraggable';
import skeleton from '@/assets/skeleton.png';


interface item {
  name: string,
  desc: string,
  id: number
};
const model = defineModel()


const itemsStore = useItemsStore();
const myArray = ref<typeof Array[]>([]);
const selectedItem = ref< typeof item | null > (null);
const popupShow = ref(false);
const showButtons = ref(false);

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

const changeItems = (id: number) => {
  itemsStore.changeItemCount(id, model.value);
  onPopupHide()
}

const onShowButtons = (count: number) => {
  showButtons.value = true;
}

const onHideButtons = () => {
  showButtons.value = false;
}

const onPopupShow = (item: typeof item | null ) => {
  popupShow.value = true;
  selectedItem.value = {...item};
  model.value = item?.count
}

const onPopupHide = () :void => {
  popupShow.value = false;
  selectedItem.value = null;
  model.value = 0;
}
</script>

<style>

* {
  box-sizing: border-box;
  margin: 0;
}

body {
  background-color: rgba(29, 29, 29, 1);
  min-height: 100dvh;
}

button {
  background-color: transparent;
  padding: 0;
  border: none;
  outline: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.container {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 32px;
}

.content {
  display: flex;
  align-items: stretch;
  gap: 24px;
}

.wrap {
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: rgba(38, 38, 38, 1);
  border-radius: 12px;
  border: 1px solid rgba(77, 77, 77, 1);
  overflow: hidden;
}
.rows {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
}

/*item*/
.item {
  height: 100px;
  color: white;
  border: 1px solid rgba(77, 77, 77, 1);
}

.item__content {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 100%;
}

.item__img {
  width: 50%;
  height: 50%;
  background-color: #556d55;
}

.item__count {
  position: absolute;
  bottom: -1px;
  right: -1px;
  color: rgba(255, 255, 255, 1);
  font-size: 10px;
  line-height: 1.2;
  border: 1px solid rgba(77, 77, 77, 1);
  border-radius: 6px 0 0 0;
  padding: 2px 4px;
}
.item.sortable-chosen {
  border-radius: 24px;
  border: 1px solid rgba(77, 77, 77, 1);
}
.no-item {
  user-select: none;
}

/*popup*/
.popup {
  position: absolute;
  top: 0;
  right: 0;
  width: 20rem;
  height: 100%;
  z-index: 10;
  background-color: rgba(38, 38, 38,1);
  color: white;
}

.popup__content {
  padding: 55px 15px 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  height: 100%;
  border: 1px solid rgba(77, 77, 77, 1);
}
.popup__close {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 24px;
  height: 24px;
  z-index: 1;
}
.popup__img {
  width: 100%;
  max-width: 130px;
  height: auto;
  aspect-ratio: 1;
  background-color: red;
}

.popup__text {
  flex: 1;
}
input[type='number'] {
  -moz-appearance: textfield;
}
.popup__input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
.popup__input {
  width: 100%;
  padding: 11px 12px;
  background-color: transparent;
  outline: none;
  border-radius: 4px;
  font-size: 14px;
  color: rgba(255, 255, 255, .4);
  border: 1px solid rgba(77, 77, 77, 1);
}
.popup__img--wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding-bottom: 30px;
  border-bottom: 1px solid rgba(77, 77, 77, 1);
  margin-bottom: 16px;
}
.popup__actions {
  padding: 20px;
  border: 1px solid rgba(77, 77, 77, 1);
  margin-top: auto;
  position: absolute;
  bottom: 0;
  left: 0;
  width: calc(100% + 2px);
  z-index: 1;
}
.popup__buttons {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
}
.popup__btn {
  width: 100%;
  padding: 11px;
  border-radius: 8px;
  background-color: white;
  color: black;
}
.popup__btn--delete {
  background-color: rgba(250, 114, 114, 1);
  color: white;
}
  /*skeleton*/
.skeleton-item {
  border: 1px solid rgba(77, 77, 77, 1);
  background-color: rgba(38, 38, 38, 1);
  width:236px;
  padding: 18px 14px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.skeleton-item__img {
  width: 100%;
  aspect-ratio: 208/240;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px;
}
.skeleton-item__img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.skeleton-item__hide{
  position: relative;
}
.skeleton-item__hide:after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: block;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #3C3C3C 0%, #444444 51.04%, #333333 100%);
  border-radius: 8px;
  z-index: 1;
}

.skeleton-item__name {
  font-size: 24px;
  margin-bottom: 20px;
}
.skeleton-item__desc {
  margin-bottom: 16px;
  font-size: 10px;
}

.skeleton-wrap {
  width: 100%;
  padding: 18px;
  border-radius: 12px;
  border: 1px solid rgba(77, 77, 77, 1);
  background-color: rgba(38, 38, 38, 1);
  position: relative;
}
.skeleton-wrap__close {
  position: absolute;
  top:  14px;
  right: 14px;
  width: 24px;
  height: 24px;
}

.skeleton-block {
  width: 89%;
  height: 36px;
  border-radius: 12px;
  background: linear-gradient(90deg, #3C3C3C 0%, #444444 51.04%, #333333 100%);
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
