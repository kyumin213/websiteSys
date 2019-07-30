<template>
	<div>
		<div class="mb20">
			<el-button type="success" size="medium" @click="addService"><i class="el-icon-plus"></i>新增</el-button>
		</div>
		<div class="mt10">
			<el-table :data="countryData" v-model='loading' border style="width: 100%" height='400' @selection-change="handleSelectionChange">
				<el-table-column type="selection"></el-table-column>
				<el-table-column prop="CountryId" sortable label="国家名称" align="center">
				</el-table-column>
				<el-table-column prop="countryAbbre" sortable label="国家简写" align="center"></el-table-column>
				<el-table-column label="操作" align="center">
					<template slot-scope="scope">
						<el-button size='small' type='success' @click='editCountry(scope.$index,scope.row)'>修改</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="mt20">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>
		</div>
		<!--新增/修改-->
		<el-dialog :title='serviceTitle' :visible.sync='addCountryModal' :close-on-click-modal='false' :before-close="closeModel">
			<el-form :model='countryForm' ref='countryForm' :rules='formRules' label-width='120px'>
				<el-form-item label='国家' prop='countryId'>
					<el-input v-model='countryForm.countryId'></el-input>
				</el-form-item>
				<el-form-item label='国家简写' prop='countryAbbre'>
					<el-input v-model='countryForm.countryAbbre'></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="confirmCountry('countryForm')">确 定</el-button>
				<el-button @click="closeModel">取 消</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name: 'countryManage',
		data() {
			return {
				serviceTitle: '',
				currentPage: 1,
				pageSize: '0',
				total: 100,
				disabled: true,
				loading: true,
				addCountryModal: false, //新增
				returnShow: false,
				checkBoxData:[],
				tipMessage: '',
				countryData: [{
						"CountryId": "美国",
						"countryAbbre": 'US',
					},
					{
						"CountryId": "香港",
						"countryAbbre": 'HK'
					}
				],
				countryForm: {
					countryId: '',
					countryAbbre: ''
				},
				formRules: {
					countryId: [{
						required: true,
						message: '请输入国家',
						trigger: 'blur'
					}],
					countryAbbre: [{
						required: true,
						message: '请输入国家简写',
						trigger: 'blur'
					}]
				}
			}
		},
		created() {
			//			this.getAllData()
		},
		methods: {
			// 是否有选中
			handleSelectionChange(val) {
				let _this = this
				_this.checkBoxData = val
			},
			//添加确定
			confirmCountry(formName) {
				let _this = this
				let param = {
					CountryName: _this.countryForm.countryId,
					CountryShorthand: _this.countryForm.countryAbbre
				}
				_this.$refs[formName].validate((valid) => {
					if(valid) {
						_this.axios.post(_this.GLOBAL.BASE_URL + '/getState', param, {
							headers: {
								'Content-Type': 'application/json'
							}
						}).then((res) => {
							console.log(res.data)
							if(res.data.success == '200') {
								_this.$message.success('添加成功')
								_this.addCountryModal = false
							} else {
								_this.$message.error(res.data.message)
							}
						}).catch((error) => {
							console.log(error)
						})
					}
				})
			},

			//新建弹窗
			addService() {
				let _this = this
				_this.addCountryModal = true
				_this.serviceTitle = '国家新增'
			},
			//修改弹窗
			editCountry(index, row) {
				let _this = this
				_this.addCountryModal = true
				let item = _this.countryData[index]
				_this.serviceTitle = '国家修改'
				_this.countryForm = {
					countryId: item.CountryId,
					countryAbbre: item.countryAbbre
				}
			},
			//关闭新增弹窗
			closeModel() {
				let _this = this
				_this.addCountryModal = false
				_this.countryForm = {
					countryId: '',
					countryAbbre: ''
				}
			},
			//初始化数据
			getAllData() {
				let _this = this
				_this.active = 1
				_this.axios.get(_this.GLOBAL.BASE_URL + 'api/OrderManagement/AddOrderByType').then((res) => {
					_this.countryData = res.data.data
					_this.loading = false
				}).catch((error) => {
					console.log(error)
				})
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`)
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`)
			}
		}
	}
</script>

<style>

</style>