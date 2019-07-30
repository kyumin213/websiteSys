<template>
	<div>
		<el-collapse-transition>
			<div class="searchBox mb20">
				<el-form ref="searchForm" :model="searchForm" class="form-item" label-width="80px">
					<el-row>
						<el-col :xs="24" :span="8">
							<el-form-item label="产品名称">
								<el-input v-model="searchForm.productName" placeholder="请输入产品名称" class="disInline"></el-input>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :span="4" class="ml20">
							<el-button type="primary" size="medium">查询</el-button>
							<el-button size="medium" @click='resetBtn'>重置</el-button>
						</el-col>
					</el-row>
				</el-form>
			</div>z
		</el-collapse-transition>
		<div class="mb20">
			<el-button type="success" size="medium" @click="addProduct"><i class="el-icon-plus"></i>新增</el-button>
			<!--<el-button type="warning" size="medium" :disabled='disabled' @click="relationCountry"><i class="el-icon-plus"></i>关联国家</el-button>-->
		</div>
		<div class="mt10">
			<el-table :data="tableData" border style="width: 100%" height='500' @selection-change="handleSelectionChange">
				<!--<el-table-column type="selection"></el-table-column>-->
				<el-table-column prop="productName" label="产品名称" align="center">
					<template slot-scope="scope">
						<el-button type="text" @click="viewProductDetails(scope.$index,scope.row)">{{scope.row.productName}}</el-button>
					</template>
				</el-table-column>
				<el-table-column prop="productTitle" label="产品标题" align="center"></el-table-column>
				<el-table-column prop="productPrice" sortable label="价格" align="center"></el-table-column>
				<el-table-column prop="productSpecs" label="规格" align="center"></el-table-column>
				<el-table-column prop="productDes" label="描述" align="center"></el-table-column>
				<el-table-column label="国家数量" align="center">
					<template slot-scope="scope">
						<el-button type='primary' size='small' @click="countryNum(scope.$index,scope.row)">国家</el-button>
					</template>
				</el-table-column>
				<el-table-column prop="status" label="状态" align="center" :formatter="putTxt"></el-table-column>
				<el-table-column label="操作" align="center">
					<template slot-scope="scope">
						<el-button type='primary' size='small' @click="editProduct(scope.$index,scope.row)">修改</el-button>
						<el-button type='danger' v-if="scope.row.status==1" size='small' @click='upperShelf(scope.$index,scope.row)'>下架</el-button>
						<el-button type='danger' v-if="scope.row.status==0" size='small' @click='upperShelf(scope.$index,scope.row)'>上架</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="mt20">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>
		</div>
		<!--新增/修改-->
		<el-dialog :title='Title' :visible.sync='addProductModal' :close-on-click-modal='false' width='60%'>
			<el-form :model='productForm' ref='productForm' :rules='formRules' label-width='120px' class="demo-dynamic" status-icon>
				<el-row>
					<el-col :span='14' :xs='25'>
						<el-form-item label='产品名称' prop='productName'>
							<el-input v-model='productForm.productName' placeholder='请输入产品名称'></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span='14' :xs='24'>
						<el-form-item label='产品标题' prop='productTitle'>
							<el-input v-model='productForm.productTitle' placeholder='请输入产品标题'></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span='14' :xs='24'>
						<el-form-item label='产品价格' prop='productPrice'>
							<el-input v-model='productForm.productPrice' placeholder='请输入产品价格'></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-form-item label='Specs'></el-form-item>
				<div v-for='(item,index) in productForm.specsList' :key='item.key'>
					<el-row>
						<el-col :span='14' :xs='24'>
							<el-form-item :label="'标题'+(index+1)" :prop="`specsList[${index}].title`" :rules="{required: true, message: '标题不能为空', trigger: 'change'}">
								<el-input v-model='item.title' placeholder="请输入标题"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span='14'>
							<el-form-item :label="'描述'+(index+1)" :prop="`specsList[${index}].productSpecs`" :rules="{required: true, message: '规格不能为空', trigger: 'change'}">
								<el-input v-model='item.productSpecs' placeholder='请输入描述'></el-input>
							</el-form-item>
						</el-col>
						<el-col :span='4' class='txtCenter'>
							<el-button type='danger' size='small' @click='removeSpecs(item,index)' :disabled='disabled3'>删除</el-button>
						</el-col>
					</el-row>
				</div>
				<el-form-item>
					<el-button type='primary' size='small' @click='addSpecs'>新增一条</el-button>
				</el-form-item>
				<el-form-item label='What you get'></el-form-item>
				<div v-for='(item,index) in productForm.getList' :key='item.key'>
					<el-row>
						<el-col :span='14'>
							<el-form-item :label="''+(index+1)" :prop="`getList[${index}].youGet`" :rules="{required: true, message: '不能为空', trigger: 'change'}">
								<el-input v-model='item.youGet' placeholder='What you get'></el-input>
							</el-form-item>
						</el-col>
						<el-col :span='4' class='txtCenter'>
							<el-button type='danger' size='small' @click='removeGet(item,index)' :disabled='disabled4'>删除</el-button>
						</el-col>
					</el-row>
				</div>
				<el-form-item>
					<el-button type='primary' size='small' @click='addGet'>新增一条</el-button>
				</el-form-item>
				<el-form-item label='Overview'></el-form-item>
				<div v-for='(item,index) in productForm.Overview' :key="item.key">
					<el-row>
						<el-col :span='14' :xs='24'>
							<el-form-item :label="'标题'+(index+1)" :prop="`Overview[${index}].title`" :rules="{required: true, message: '标题不能为空', trigger: 'change'}">
								<el-input v-model='item.title' placeholder="请输入标题"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span='14' :xs='24'>
							<el-form-item :label="'描述'+(index+1)" :prop="`Overview[${index}].des`" :rules="{required: true, message: '描述不能为空', trigger: 'change'}">
								<el-input type='textarea' v-model='item.des' placeholder='请输入描述' :autosize="{ minRows: 2, maxRows: 6}"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span='4' class='txtCenter'>
							<el-button type='danger' size='small' @click='removeOverview(item,index)' :disabled='disabled2'>删除</el-button>
						</el-col>
					</el-row>
				</div>
				<el-form-item>
					<el-button type='primary' size='small' @click='addOverview'>新增一条</el-button>
				</el-form-item>
				<el-form-item label='国家关联链接'></el-form-item>
				<div v-for='(item,index) in productForm.countryList' :key="item.key">
					<el-row>
						<el-col :span='10' :xs='24'>
							<el-form-item :label="'国家'+(index+1)" :prop="`countryList[${index}].countryId`" :rules="{required: true, message: '国家不能为空', trigger: 'change'}">
								<el-select v-model="item.countryId" placeholder="请选择">
									<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span='14' :xs='24'>
							<el-form-item :label="'链接'+(index+1)" :prop="`countryList[${index}].links`" :rules="{required: true, message: '链接不能为空', trigger: 'change'}">
								<el-input v-model='item.links' placeholder='请输入关联链接'></el-input>
							</el-form-item>
						</el-col>
						<el-col :span='4' class='txtCenter'>
							<el-button type='danger' size='small' @click='removeCountry(item,index)' :disabled='disabled'>删除</el-button>
						</el-col>
					</el-row>
				</div>
				<el-form-item>
					<el-button type='primary' size='small' @click='addCountry'>新增一条</el-button>
				</el-form-item>
				<el-form-item label='Note'></el-form-item>
				<div v-for='(item,index) in productForm.noteList' :key='item.key'>
					<el-row>
						<el-col :span='14' :xs='24'>
							<el-form-item :label="' '+(index+1)">
								<el-input v-model='item.note'></el-input>
							</el-form-item>
						</el-col>
						<el-col :span='4' class='txtCenter'>
							<el-form-item>
								<el-button type='danger' size='small' @click='removeNote(item,index)'  :disabled='disabled5'>删除</el-button>
							</el-form-item>
						</el-col>
					</el-row>
				</div>
				<el-form-item>
					<el-button type='primary' size='small' @click='addNote'>新增一条</el-button>
				</el-form-item>
				<el-form-item label='产品描述' prop='productDes'>
					<el-input type='textarea' v-model='productForm.productDes' class='wid90' :autosize="{ minRows: 3, maxRows: 10}" placeholder='请输入产品描述 '></el-input>
				</el-form-item>
				<el-form-item label='产品封面图'>
					<p>可上传图片数1(图片大小不应超过5M)</p>
					<el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
						<i class="el-icon-plus"></i>
					</el-upload>
					<el-dialog :visible.sync="dialogVisible">
						<img width="100%" :src="dialogImageUrl" alt="">
					</el-dialog>
				</el-form-item>
				<el-form-item label='详情图片'>
					<p>最多上传5张图片(单张图片大小不应超过5M)</p>
					<el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="handlePictureCardPreview2" :on-remove="handleRemove2">
						<i class="el-icon-plus"></i>
					</el-upload>
					<el-dialog :visible.sync="dialogVisible2">
						<img width="100%" :src="dialogImageUrl2" alt="">
					</el-dialog>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="confirmProduct('productForm')">确 定</el-button>
				<el-button @click="addProductModal = false">取 消</el-button>
			</div>
		</el-dialog>
		<!--查看详情-->
		<el-dialog title='国家管理详情信息 ' :visible.sync='viewProductModal ' :close-on-click-modal='false '>
			<el-form :model='productForm ' ref='productForm ' label-width='120px '>
				<el-form-item label='产品名称： '>
					<span>{{productForm.productName}}</span>
				</el-form-item>
				<el-form-item label='产品标题： '>
					<span>{{productForm.productTitle}}</span>
				</el-form-item>
				<el-form-item label='产品价格： '>
					<span>{{productForm.productPrice}}</span>
				</el-form-item>
				<el-form-item label='Specs'></el-form-item>
				<div v-for='(item,index) in productForm.specsList' :key='item.key'>
					<el-form-item :label="'标题：'+(index+1)">
						<span>{{item.title}}</span>
					</el-form-item>
					<el-form-item :label="'规格：'+(index+1)">
						<span>{{item.productSpecs}}</span>
					</el-form-item>
				</div>
				<el-form-item label='What you get'></el-form-item>
				<div v-for='(item,index) in productForm.getList' :key='item.key'>
					<el-form-item :label="''+(index+1)">
						<span>{{item.youGet}}</span>
					</el-form-item>
				</div>
				<el-form-item label='Overview'></el-form-item>
				<div v-for='(item,index) in productForm.Overview' :key="item.key">
					<el-form-item :label="'标题'+(index+1)">
						<span>{{item.title}}</span>
					</el-form-item>
					<el-form-item :label="'描述'+(index+1)">
						<span>{{item.des}}</span>
					</el-form-item>
				</div>
				<el-form-item label='国家关联链接'></el-form-item>
				<div v-for='(item,index) in productForm.countryList' :key="item.key">
					<el-form-item :label="'国家'+(index+1)">
						<span>{{item.countryId}}</span>
					</el-form-item>
					<el-form-item :label="'链接'+(index+1)">
						<span>{{item.links}}</span>
					</el-form-item>
				</div>
				<el-form-item label='Note'></el-form-item>
				<div v-for='(item,index) in productForm.noteList' :key='item.key'>
					<el-row>
						<el-col :span='14' :xs='24'>
							<el-form-item :label="' '+(index+1)">
								<span>{{item.note}}</span>
							</el-form-item>
						</el-col>
					</el-row>
				</div>
				<el-form-item label='产品描述： '>
					<span>{{productForm.productDes}}</span>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="viewProductModal=false">关 闭</el-button>
			</div>
		</el-dialog>

		<!--国家数量-->
		<el-dialog title='关联国家' :visible.sync='countryNumModal' :close-on-click-modal='false'>
			<el-table :data="countryData" v-model='loading' border style="width: 100%" height='400'>
				<el-table-column prop="CountryId" sortable label="国家名称" align="center">
				</el-table-column>
				<el-table-column prop="countryAbbre" sortable label="国家简写" align="center"></el-table-column>
			</el-table>
			<div class="mt20">
				<el-pagination @size-change="handleSizeChange2" @current-change="handleCurrentChange2" :current-page="currentPage2" :page-sizes="[10, 20, 30, 40]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="total2">
				</el-pagination>
			</div>
			<div slot='footer' class='dialog-footer'>
				<el-button @click='countryNumModal=false'>关闭</el-button>
			</div>
		</el-dialog>
		<!--上、下架-->
		<el-dialog title='温馨提示' :visible.sync='upperShelfModal' :close-on-click-modal='false' width='30%' center>
			<div class="del-dialog-cnt txtCenter">{{message}}</div>
			<span slot="footer" class="dialog-footer">
        <el-button type='primary'>确定</el-button>
        <el-button @click='upperShelfModal=false'>取消</el-button>
        </span>
		</el-dialog>
	</div>
</template>

<script>
	import vali from './common/validate';
	import country from './countryManage.vue'
	export default {
		name: 'proManage',
		data() {
			return {
				message: '',
				options: [{
					value: '1',
					label: '美国'
				}, {
					value: '2',
					label: '德国'
				}, {
					value: '3',
					label: '加拿大'
				}, {
					value: '4',
					label: '香港'
				}],
				dialogImageUrl: '',
				dialogVisible: false,
				dialogImageUrl2: '',
				dialogVisible2: false,
				Title: '',
				currentPage: 1,
				currentPage2: 1,
				pageSize: '0 ',
				pageSize2: '0 ',
				total: 100,
				total2: 100,
				loading: true,
				addProductModal: false, //新增
				viewProductModal: false, //查看详情
				countryModal: false, //关联国家
				countryNumModal: false, //关联国家数量
				upperShelfModal: false, //上下架
				checkBoxData: [],
				checkBoxData2: [],
				disabled: true,
				disabled2: true,
				disabled3: true,
				disabled4: true,
				disabled5: true,
				productPut: 0,
				tableData: [{
						"productName": "充电宝",
						"productTitle": "Amazon",
						"productPrice": 15.99,
						"productSpecs": '黑色 ',
						"productDes": "淡绿色指示灯",
						"status": 0
					},
					{
						"productName": "充电宝",
						"productTitle": "Amazon",
						"productPrice": 23.99,
						"productSpecs": '灰色 ',
						"productDes": "淡绿色指示灯",
						"status": 1
					}
				],
				countryData: [{
						"CountryId": "美国",
						"countryAbbre": 'US',
					},
					{
						"CountryId": "香港",
						"countryAbbre": 'HK'
					}
				],
				searchForm: {
					productName: ''
				},
				productForm: {
					productName: '',
					productTitle: '',
					productPrice: '',
					productDes: '',
					countryList: [{
						countryId: '',
						links: ''
					}],
					Overview: [{
						title: '',
						des: ''
					}],
					specsList: [{
						title:'',
						productSpecs: ''
					}],
					getList: [{
						youGet: ''
					}],
					noteList:[{
						note:''
					}]
				},
				formRules: {
					productName: [{
						required: true,
						message: '请输入产品名称',
						trigger: 'blur'
					}],
					productTitle: [{
						required: true,
						message: '请输入产品标题',
						trigger: 'blur'
					}],
					productPrice: [{
						required: true,
						message: '请输入产品价格',
						trigger: 'blur'
					}, {
						validator: vali.proPrice,
						trigger: 'change'
					}],
					//					productSpecs: [{
					//						required: true,
					//						message: '请输入产品规格',
					//						trigger: 'blur'
					//					}],
					productDes: [{
						required: true,
						message: '请输入产品描述',
						trigger: 'blur'
					}]
				}
			}
		},
		components: {
			country
		},
		methods: {
			//新增一条注意事项
			addNote(){
				let _this = this
				_this.productForm.noteList.push({
					note: ''
				})
				let len = _this.productForm.noteList.length
				if(len > 1) {
					_this.disabled5 = false
				}
			},
			removeNote(item,index){
				let _this = this
				_this.index = _this.productForm.noteList.indexOf(item)
				let len = _this.productForm.noteList.length
				if(index !== -1) {
					_this.productForm.noteList.splice(index, 1)
				}
				if(len <= 2) {
					_this.disabled5 = true
				}
			},
			// 上下架状态
			putTxt(val) {
				if(val.status == 0) {
					return '下架'
				} else if(val.status == 1) {
					return '上架'
				}
			},
			//上架
			upperShelf(index, row) {
				let _this = this
				_this.upperShelfModal = true
				let item = _this.tableData[index]
				let status = item.status
				if(status === 0) {
					_this.message = '是否上架该产品？'
					_this.productPut = 1
				} else {
					_this.message = '是否下架该产品？'
					_this.productPut = 0
				}
			},
			//新增一条you get
			addGet() {
				let _this = this
				_this.productForm.getList.push({
					youGet: ''
				})
				let len = _this.productForm.getList.length
				if(len > 1) {
					_this.disabled4 = false
				}
			},
			//删除一条you get
			removeGet(item, index) {
				let _this = this
				_this.index = _this.productForm.getList.indexOf(item)
				let len = _this.productForm.getList.length
				if(index !== -1) {
					_this.productForm.getList.splice(index, 1)
				}
				if(len <= 2) {
					_this.disabled4 = true
				}
			},
			//新增一条规格
			addSpecs() {
				let _this = this
				_this.productForm.specsList.push({
					title:'',
					productSpecs: ''
				})
				let len = _this.productForm.specsList.length
				if(len > 1) {
					_this.disabled3 = false
				}
			},
			//删除一条规格
			removeSpecs(item, index) {
				let _this = this
				_this.index = _this.productForm.specsList.indexOf(item)
				let len = _this.productForm.specsList.length
				if(index !== -1) {
					_this.productForm.specsList.splice(index, 1)
				}
				if(len <= 2) {
					_this.disabled3 = true
				}
			},
			//新增一条概述
			addOverview() {
				let _this = this
				_this.productForm.Overview.push({
					title: '',
					des: ''
				})
				let len = _this.productForm.Overview.length
				if(len > 1) {
					_this.disabled2 = false
				}
			},
			//删除一条概述
			removeOverview(item, index) {
				let _this = this
				_this.index = _this.productForm.Overview.indexOf(item)
				let len = _this.productForm.Overview.length
				if(index !== -1) {
					_this.productForm.Overview.splice(index, 1)
				}
				if(len <= 2) {
					_this.disabled2 = true
				}
			},
			//新增一条国家关联
			addCountry() {
				let _this = this
				_this.productForm.countryList.push({
					countryId: '',
					links: ''
				})
				let len = _this.productForm.countryList.length
				if(len > 1) {
					_this.disabled = false
				}
			},
			//删除一条国家关联
			removeCountry(item, index) {
				let _this = this
				_this.index = _this.productForm.countryList.indexOf(item)
				let len = _this.productForm.countryList.length
				if(index !== -1) {
					_this.productForm.countryList.splice(index, 1)
				}
				if(len <= 2) {
					_this.disabled = true
				}
			},
			//关联国家数量
			countryNum(index, row) {
				let _this = this
				_this.countryNumModal = true
			},
			//关联国家
			relationCountry() {
				let _this = this
				_this.countryModal = true
			},
			// 是否有选中
			handleSelectionChange(val) {
				let _this = this
				_this.checkBoxData = val
				let checkNum = _this.checkBoxData.length
				if(checkNum > 0) {
					_this.disabled = false
				}
			},
			//国家是否选中
			handleSelectionChange2(val) {
				let _this = this
				_this.checkBoxData2 = val
			},
			//新增封面图片
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			//新增详情图片
			handleRemove2(file, fileList) {
				console.log(file, fileList);
			},
			handlePictureCardPreview2(file) {
				this.dialogImageUrl2 = file.url;
				this.dialogVisible2 = true;
			},
			//新增弹窗
			addProduct() {
				let _this = this
				_this.addProductModal = true
				_this.Title = '新增 '
			},
			//修改弹窗
			editProduct(index, row) {
				let _this = this
				_this.addProductModal = true
				_this.Title = '修改 '
				let item = _this.tableData[index]
				_this.productForm = {
					productName: item.productName,
					productTitle: item.productTitle,
					productPrice: item.productPrice,
					productSpecs: item.productSpecs,
					productDes: item.productDes,
					countryList: [{
						countryId: '',
						links: ''
					}],
					Overview: [{
						title: '',
						des: ''
					}],
					specsList: [{
						title:'',
						productSpecs: ''
					}],
					getList: [{
						youGet: ''
					}],
					noteList:[{
						note:''
					}]
				}

			},
			//查看详情
			viewProductDetails(index, row) {
				let _this = this
				_this.viewProductModal = true
				let item = _this.tableData[index]
				_this.productForm = {
					productName: item.productName,
					productTitle: item.productTitle,
					productPrice: item.productPrice,
					productSpecs: item.productSpecs,
					productDes: item.productDes,
				}
			},
			//新增确认
			confirmProduct(formName) {
				let _this = this
				_this.$refs[formName].validate((valid) => {
					if(valid) {
						_this.addProductModal = false
					}
				})
			},
			//翻页
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`)
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`)
			},
			//国家翻页
			handleSizeChange2(val) {
				console.log(`每页 ${val} 条`)
			},
			handleCurrentChange2(val) {
				console.log(`当前页: ${val}`)
			},
			//重置
			resetBtn() {
				let _this = this
				_this.searchForm.productName = ' '
			}
		}
	}
</script>

<style scoped>
	.searchBox {
		width: 100%;
		padding: 20px 30px 10px 30px;
		box-sizing: border-box;
		margin-bottom: 20px;
		text-align: left;
		box-shadow: 2px 2px 10px #ccc;
	}
</style>