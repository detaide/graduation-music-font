<script setup>
import { reactive, ref, onMounted } from "vue";
import service from "../../request";
import router from "../../router";
import { loginCellPhone } from "@/request/api/login.js";
import { usemusicStore } from "../../store/music";
import { login2Local, register2Local } from "../../request/localApi/login";
import { CryptoUtil } from "../../utils/index"
const ruleFormRef = ref();
const musicStore = usemusicStore();
const ruleForm = reactive({
	//对应一个对象
	username: "",
	password: "",
});

const labelPosition = { labelPosition: "left" };
// const retBtn = ref(null);

const rules = ref({
	//根据prop，设置规则
	username: [
		{ required: true, message: "请输入用户名", trigger: "blur" },
		{ min: 3, max: 11, message: "Length should be 3 to 11", trigger: "blur" },
	],
	password: [
		{ required: true, message: "请输入密码", trigger: "blur" },
		{ min: 3, max: 16, message: "Length should be 3 to 16", trigger: "blur" },
	],
});

// onMounted(() => {
//   //console.log("ref>", retBtn.value)
// }),

function retHome() {
	router.push("/home")
}

async function Login(formEl) {

	formEl.validate(async (valid) => {
		if (valid) {
			// 密码加密
			ruleForm.password = CryptoUtil.encrypted(ruleForm.password);
			//保存到本地数据库
			let response = await login2Local(ruleForm);
			let responseData = response.data;
			let resStatus = responseData.data.status;
			//console.log(responseData)

			if (!resStatus) {
				alert(`${response.data.reason || `服务器异常`}`);
				ruleForm.password = "";
				return;
			}

			// 将用户id保存到store
			musicStore.id = responseData.data.data.user_id
			// 将用户id保存到localStorage
			localStorage.setItem('userId', musicStore.id)
			musicStore.updateUserId(musicStore.id)

			// 更改状态为在线状态
			musicStore.isLogin = true;

			// localStorage.setItem('Token', musicStore.token);


			router.push("/mine");
		} else {
			alert("手机号或者密码错误，请重新尝试~");
			ruleForm.password = "";
		}
	});
}

async function register(formEl)
{
	formEl.validate(async (valid) => {
		if (valid) {
			// 密码加密
			ruleForm.password = CryptoUtil.encrypted(ruleForm.password);
			//保存到本地数据库
			let response = await register2Local(ruleForm);
			let responseData = response.data;
			let resStatus = responseData.data.status;

			if (!resStatus) {
				alert(`${response.data.reason || `服务器异常`}`);
				return;
			}

			alert("注册成功");
			return;

			// // 将用户id保存到store
			// musicStore.id = responseData.data.user_id
			// // 将用户id保存到localStorage
			// localStorage.setItem('userId', musicStore.id)
			// musicStore.updateUserId(musicStore.id)

			// // 更改状态为在线状态
			// musicStore.isLogin = true;

			// localStorage.setItem('Token', musicStore.token);


			// router.push("/mine");
		} else {
			alert("手机号或者密码错误，请重新尝试~");
			ruleForm.password = "";
		}
	});
}
</script>
<template>
	<div class="login-content">
		<el-icon :color="'#aaa'" :size="30" class="retIcon" ref="retBtn" @click="retHome">
			<ArrowLeftBold />
		</el-icon>
		<div class="login-main">仿网易云音乐</div>
		<div class="login-container">
			<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="70px" class="demo-ruleForm"
				:label-position="labelPosition">
				<el-form-item label="用户名" prop="user" class="login-label" :labelStyle="{ color: 'red' }">
					<el-input v-model="ruleForm.username" />
				</el-form-item>
				<el-form-item label="密码" type="password" prop="password" class="login-label">
					<el-input v-model="ruleForm.password" />
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="Login(ruleFormRef)">登录</el-button>
					<el-button @click="register(ruleFormRef)">注册</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>
<style scoped>
.login-content {
	background-color: url('@assets/logo.svg');
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100vw;
	height: 100vh;
	gap: 5vh;
	position: relative;
}

.login-main {
	font-size: 20px;
	font-weight: bold;
	color: red;
}

.demo-ruleForm {
	/* display: flex; */
	/* align-items: center; */
	/* justify-content: center; */
	margin-left: -40px;
}

/* .login-label{
  justify-content: flex-start !important;
  
} */

.retIcon {
	border: 1px solid #aaa;
	padding: 4px;
	border-radius: 50%;
	position: absolute;
	top: 5vh;
	left: 10vw;
}
</style>