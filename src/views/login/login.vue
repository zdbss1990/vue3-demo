<!--
 * @Author: zhangyao
 * @Date: 2022-01-18 17:09:46
 * @LastEditors: zhangyao
 * @LastEditTime: 2022-02-09 10:24:34
-->
<template>
  <div class="login-tpl" :style="bgColor">
    <div class="login-form">
      <div class="login-top">
        <h5 class="login-title"><span class="logo"></span>Y Manage System</h5>
      </div>
      <el-form ref="loginRef" :model="loginForm" :rules="rules">
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            :prefix-icon="User"
            placeholder="请输入账号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            :type="inputType"
            :prefix-icon="Lock"
            placeholder="请输入密码"
          >
            <template #suffix>
              <el-icon
                class="el-input__icon"
                :color="color"
                v-if="loginForm.password.length"
                @click="changeInputType"
                ><View />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="submit-button" @click="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
    <bg-panel></bg-panel>
  </div>
</template>

<script>
import { computed, reactive, ref, getCurrentInstance } from "vue";
import { User, Lock, View } from "@element-plus/icons-vue";
import BgPanel from "./components/bg-panel/bg-panel.vue";
import useChangeBg from "./hooks/useChangeBg";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  components: {
    View,
    BgPanel,
  },
  setup() {
    const loginForm = reactive({
      username: "",
      password: "",
    });
    const rules = reactive({
      username: [
        {
          required: true,
          message: "请输入账号",
          trigger: "blur",
        },
      ],
      password: [
        {
          required: true,
          message: "请输入密码",
          trigger: "blur",
        },
        {
          min: 6,
          max: 12,
          message: "密码长度请在6~12字符之间",
          trigger: "blur",
        },
      ],
    });
    const inputType = ref("password");
    const changeInputType = () => {
      inputType.value = inputType.value === "text" ? "password" : "text";
    };
    const color = computed(() => {
      return inputType.value === "text" ? "#409eff" : "";
    });

    const { activeBg } = useChangeBg;
    const bgColor = computed(() => {
      return { "--bg": activeBg.value };
    });

    const store = useStore();
    const loginRef = ref(null);
    const router = useRouter();
    const { proxy } = getCurrentInstance();
    const submit = () => {
      loginRef.value.validate((valid) => {
        if (valid) {
          store.dispatch("login", loginForm).then(() => {
            proxy.$notifyMsg({
              type: "success",
              message: "登陆成功",
              title: "提示",
            });
            router.push({ path: "/" });
          });
        } else {
          console.log("error submit!");
          return false;
        }
      });
    };
    return {
      loginForm,
      rules,
      User,
      Lock,
      inputType,
      changeInputType,
      color,
      bgColor,
      submit,
      loginRef,
    };
  },
};
</script>
<style lang="scss" scoped>
.login-tpl {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--bg);
  .login-title {
    font-size: 20px;
    color: #303133;
    margin-bottom: 20px;
  }
  .login-form {
    width: 400px;
    padding: 20px;
    box-sizing: border-box;
    background: rgba(255, 251, 251, 0.15);
    border-radius: 5px;
    box-shadow: 0px 0px 2px 2px rgba(228, 224, 224, 0.15);
  }
  .submit-button {
    width: 100%;
    margin-top: 10px;
  }
  .logo {
    display: inline-block;
    margin-right: 10px;
    background: #00acac;
    border: 10px solid transparent;
    border-color: rgba(0, 0, 0, 0) rgba(0, 0, 0, 0.15) rgba(0, 0, 0, 0.3);
    position: relative;
    overflow: hidden;
    border-radius: 4px;
    vertical-align: middle;
  }
  .login-top {
    text-align: center;
  }
}
</style>