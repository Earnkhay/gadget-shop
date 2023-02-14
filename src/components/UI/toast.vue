<template>
  <div>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component"

@Options({
    props: {
      icon: String,
      title: String,
    }
})

export default class toast extends Vue {
  // eslint-disable-next-line
  $swal: any
  icon: string | undefined
  title: string | undefined
  displayToast() {
    this.$swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    }).fire({
      icon: this.icon,
      title: this.title,
    })
  }    
  mounted(){
    this.displayToast()
  }
}
</script>

<style scoped>
</style>