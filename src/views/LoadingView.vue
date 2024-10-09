<template>
  <div
    class="fixed flex items-center justify-center z-50 top-0 left-0 w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.5)]"
  >
    <ul>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</template>

<style scoped>
@keyframes loading {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

ul {
  position: relative;
  margin: 0;
  padding: 0;
  list-style: none;
}

li {
  position: absolute;
  top: 50%;
  left: 50%;
  border: 5px solid rgba(255, 255, 255, 0.062);
  border-radius: 100%;
}

li:nth-child(1) {
  margin: -30px 0 0 -30px;
  border-top-color: #f58d71;
  width: 60px;
  height: 60px;
  animation: loading 3s infinite linear;
}

li:nth-child(2) {
  margin: -20px 0 0 -20px;
  border-top-color: #f58d71;
  width: 40px;
  height: 40px;
  animation: loading 2s infinite linear;
}

li:nth-child(3) {
  margin: -10px 0 0 -10px;
  border-top-color: #f58d71;
  width: 20px;
  height: 20px;
  animation: loading 1s infinite linear;
}
</style>
