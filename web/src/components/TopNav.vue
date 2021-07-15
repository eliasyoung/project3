<template>
  <div class="bg-primary pt-4 pb-3">
    <div class="nav nav-inverse d-flex jc-around text-white fs-lg pt-1 pb-1 text-center">
      <router-link to="/" custom v-slot="{ navigate, isExactActive }">
        <div
          class="nav-item"
          @click="navigate"
          @keypress.enter="navigate"
          role="link"
        >
          <span :class="isExactActive ? 'active' : ''">
            首页
          </span>
        </div>
      </router-link>
      <router-link to="/strategycenter" custom v-slot="{ navigate, isExactActive }">
        <div
          class="nav-item"
          @click="navigate"
          @keypress.enter="navigate"
          role="link"
        >
          <span :class="isExactActive ? 'active' : ''">
            攻略中心
          </span>
        </div>
      </router-link>
      <router-link to="/competition" custom v-slot="{ navigate, isExactActive }">
        <div
          class="nav-item"
          @click="navigate"
          @keypress.enter="navigate"
          role="link"
        >
          <span :class="isExactActive ? 'active' : ''">
            赛事中心
          </span>
        </div>
      </router-link>
      <router-link to="/newip" custom v-slot="{ navigate, isExactActive }">
        <div
          class="nav-item"
          @click="navigate"
          @keypress.enter="navigate"
          role="link"
        >
          <span :class="isExactActive ? 'active' : ''">
            IP新游
          </span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "topNav",
};
</script>

<style scoped></style>
