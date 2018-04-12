<style lang="less">
    @import './login.less';
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit" @click="changeBackground">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="userName">
                            <Input v-model="form.userName" placeholder="请输入用户名">
                                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" placeholder="请输入密码">
                                <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
import MaterialImage from 'material-image';
import {login} from '../api/login.js';
export default {
    data () {
        return {
            form: {
                userName: '',
                password: '',
                backgroundLess: '',
                ontClick: false
            },
            rules: {
                userName: [
                    { required: true, message: '账号不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            }
        };
    },
    created() {
        this.backgroundLess = new MaterialImage({
            el: this.$refs.login
        });
    },
    methods: {
        handleSubmit () {
            this.$refs.loginForm.validate(async (valid) => {
                if (valid) {
                    try {
                        if (this.ontClick) return
                        this.ontClick = true
                        const user = await login({username: this.form.userName, password: this.form.password})
                        const userIF = user.data.data
                        Cookies.set('user', userIF[0].username);
                        sessionStorage.setItem("userName", userIF[0].username)
                        Cookies.set('grade', userIF[0].grade);
                        this.$router.push({
                            name: 'home_index'
                        });
                        this.$notify({
                            title: '成功',
                            message: `欢迎你${Cookies.get('user')}`,
                            type: 'success'
                        });
                    } catch (e) {
                        console.log(e)
                    } finally {
                      this.ontClick = false
                    }
                }
            });
        },
        changeBackground () {
            this.backgroundLess.protract();
        }
    }
};
</script>

