<template>
  <div class="register">
    <span class="copyright">{{ $t('system.copyright') }}</span>
  </div>
</template>

<i18n locale="en" src="./locales/en.json"></i18n>
<i18n locale="zh" src="./locales/zh.json"></i18n>

<script>
export default {
  name: 'Register',
  mounted() {
    this.$modal.alert.error(`<font color='red'>${this.$t('systemTipDesc')}</font>`, {
      dangerouslyUseHTMLString: true,
      showClose: false,
    }).then(() => {
      this.$router.push("/login")
    }).catch(() => { })
  }
}
</script>

<style lang="scss" scoped>
  .register {
    width: 100vw;
    height: 100vh;
    background-image: url("@/assets/img/login-background.jpg");
    background-size: cover;
    position: relative;

    .copyright {
      color: #999;
      font-size: 12px;
      position: absolute;
      left: 50%;
      bottom: 18px;
      transform: translateX(-50%);
    }
  }
</style>