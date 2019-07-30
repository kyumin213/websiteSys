<template>
  <div>
    <div class="mb20">
      <el-button type="success" size="medium" @click="addType"><i class="el-icon-plus"></i>新增</el-button>
    </div>
    <div class="mt10">
      <el-table :data="typeData" v-model='loading' border style="width: 100%" height='400'>
        <el-table-column prop="typeName" sortable label="类型名称" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
          	<el-button size='small' type='success' @click='editType(scope.$index,scope.row)'>修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="mt20">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
    <!--新增/修改-->
    <el-dialog :title='title' :visible.sync='addTypeModal' :close-on-click-modal='false' :before-close="closeModel">
      <el-form :model='typeForm' ref='typeForm' :rules='formRules' label-width='120px'>
        <el-form-item label='分类名称' prop='typeName'>
          <el-input v-model='typeForm.typeName' placeholder='请输入分类名称'></el-input>
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
        title: '',
        currentPage: 1,
        pageSize: '0',
        total: 100,
        loading: true,
        addTypeModal: false, //新增
        typeData: [{
            "typeName": "手机配件"
          },
          {
            "typeName": "电脑配件"
          }
        ],
        typeForm: {
          typeName: ''
        },
        formRules: {
          typeName: [{
            required: true,
            message: '请输入分类名称',
            trigger: 'blur'
          }]
        }
      }
    },
    created() {
      //			this.getAllData()
    },
    methods: {
      //添加确定
      confirmCountry(formName) {
        let _this = this
        let param = {
          CountryName: _this.typeForm.typeName
        }
        _this.$refs[formName].validate((valid) => {
          if (valid) {
            _this.axios.post(_this.GLOBAL.BASE_URL + '/getState', param, {
              headers: {
                'Content-Type': 'application/json'
              }
            }).then((res) => {
              console.log(res.data)
              if (res.data.success == '200') {
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
      addType() {
        let _this = this
        _this.addTypeModal = true
        _this.title = '分类新增'
      },
      //修改弹窗
      editType(index,row) {
        let _this = this
        _this.addTypeModal = true
        let item = _this.typeData[index]
        _this.title = '分类修改'
        _this.typeForm={
          typeName: item.typeName
        }
      },
      //关闭新增弹窗
      closeModel() {
        let _this = this
        _this.addTypeModal = false
        _this.typeForm={
        typeName: ''
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
