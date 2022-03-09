<template>
    <div class="">
        <div class="crumbs">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item><i class="el-icon-lx-copy"></i>材料管理</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="container">
            <span style="margin-right: 15px; font-size: 15px">材料编号：</span>
            <el-input v-model="tableData.searchMaterialNumber" placeholder="材料编号" class="handle-input mr10"></el-input>
            <span style="margin-right: 15px; font-size: 15px; margin-left: 30px">材料名称：</span>
            <el-input v-model="tableData.searchMaterialName" placeholder="材料名称" class="handle-input mr10"></el-input>
            <div style="float: right">
                <el-button icon="el-icon-refresh" @click="handleSearchInputReset()" style="color: #696969">重置</el-button>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch()">搜索</el-button>
            </div>
        </div>
        <div class="container">
            <div>
                <el-table ref="multipleTableRef"
                          :data="tableData.displayMaterials"
                          style="width: 100%"
                          border
                          @selection-change="handleSelectionChange"
                          :row-key="getRowKey">
                    <el-table-column type="selection" width="55" :reserve-selection="true"/>
                    <el-table-column label="序号" width="55">
                        <template #default="scope">
                            {{ scope.$index + 1}}
                        </template>
                    </el-table-column>
                    <el-table-column label="编号">
                        <template #default="scope" >
                            <!-- {{ scope.row.number }} -->
                            {{ scope.row.id }}
                        </template>
                    </el-table-column>
                    <el-table-column label="名称">
                        <template #default="scope" >
                            {{ scope.row.name }}
                        </template>
                    </el-table-column>
                    <el-table-column label="数目">
                        <template #default="scope" >
                            {{ scope.row.count }}
                        </template>
                    </el-table-column>
                    <el-table-column label="拥有者">
                        <template #default="scope" >
                            {{ scope.row.owner }}
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="200" align="center">
                        <template #default="scope">
                            <el-button type="text" icon="el-icon-tickets" class="green"
                                       @click="detailDialogVisible=true;handleDetail(scope.$index, scope.row)">详细</el-button>
                            <el-button type="text" icon="el-icon-edit" @click="editDialogVisible=true;handleDetail(scope.$index, scope.row)">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-dialog
                    v-model="detailDialogVisible"
                    title="材料详细信息"
                    width="30%"
                >
                    <el-form :model="tableData.nowMaterial" label-width="70px">
                        <el-form-item label="材料编号">
                            <el-input v-model="tableData.nowMaterial.id" :readonly="true"></el-input>
                        </el-form-item>
                        <el-form-item label="材料名称">
                          <el-input v-model="tableData.nowMaterial.name" :readonly="true"></el-input>
                        </el-form-item>
                        <el-form-item label="材料数目">
                          <el-input v-model="tableData.nowMaterial.count" :readonly="true"></el-input>
                        </el-form-item>
                        <el-form-item label="拥有者">
                            <el-input v-model="tableData.nowMaterial.owner" :readonly="true"></el-input>
                        </el-form-item>
                    </el-form>
                    <template #footer>
                        <span class="dialog-footer">
                            <el-button type="primary" @click="detailDialogVisible = false">关闭</el-button>
                        </span>
                    </template>
                </el-dialog>
                <el-dialog
                    v-model="editDialogVisible"
                    title="编辑材料信息"
                    width="30%"
                >
                    <el-form ref="formRef1" :model="tableData.nowMaterial" :rules="rules" label-width="80px">
                        <el-form-item label="材料编号">
                            <el-input v-model="tableData.nowMaterial.id" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="材料名称" prop="name">
                            <el-input v-model="tableData.nowMaterial.name"></el-input>
                        </el-form-item>
                        <el-form-item label="材料数目" prop="count">
                            <el-input v-model="tableData.nowMaterial.count"></el-input>
                        </el-form-item>
                        <el-form-item label="拥有者" prop="owner">
                            <el-input v-model="tableData.nowMaterial.owner"></el-input>
                        </el-form-item>
                    </el-form>
                    <template #footer>
                        <span class="dialog-footer">
                            <el-button @click="editDialogVisible = false;">取消</el-button>
                            <el-button type="primary" @click="editDialogVisible = false;handleModify()">确定</el-button>
                        </span>
                    </template>
                </el-dialog>
                <el-dialog
                    v-model="addDialogVisible"
                    title="新增材料信息"
                    width="30%"
                >
                    <el-form ref="formRef2" :model="newMaterial" :rules="rules" label-width="80px">
                        <el-form-item label="材料编号" prop="id">
                            <el-input v-model="newMaterial.id">M</el-input>
                        </el-form-item>
                        <el-form-item label="材料名称" prop="name">
                            <el-input v-model="newMaterial.name"></el-input>
                        </el-form-item>
                        <el-form-item label="材料数目" prop="count">
                            <el-input v-model="newMaterial.count"></el-input>
                        </el-form-item>
                        <el-form-item label="拥有者" prop="owner">
                            <el-input v-model="newMaterial.owner"></el-input>
                        </el-form-item>
                    </el-form>
                    <template #footer>
                        <span class="dialog-footer">
                            <el-button @click="addDialogVisible = false;">取消</el-button>
                            <el-button type="primary" @click="editDialogVisible = false;addNewMaterialReset()">重置</el-button>
                            <el-button type="primary" @click="addDialogVisible = false;addNewMaterial()">确定</el-button>
                        </span>
                    </template>
                </el-dialog>
            </div>
            <div class="handle-row">
                <el-button type="primary" @click="addDialogVisible=true">添加</el-button>
                <el-button type="primary" @click="deleteSelectMaterial">删除</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, reactive} from "vue";
import { ElLoading, ElMessage, ElMessageBox } from "element-plus";
import { getMaterial, deleteMyMaterial, modifyMaterial, addMaterial } from "../api/material";

export default {
    name: "tabs",
    setup() {
        const multipleTableRef = ref();
        const formRef1 = ref(null);
        const formRef2 = ref(null);
        const tableData = reactive({
            materials: [],
            displayMaterials: [],
            nowMaterial: undefined,
            multipleSelection: [],
            searchMaterialNumber: "",
            searchMaterialName: "",
        });

        const rules = {
            id: [
                { required: true, message: "请输入编号", trigger: "blur" },
                { min:1, max:20, message: "输入过长", trigger: "blur" },
            ],
            name: [
                { required: true, message: "请输入名称", trigger: "blur" },
                { min:1, max:20, message: "名称过长", trigger: "blur" },
            ],
            count: [
                { required: true, message: "请输入数目", trigger: "blur" },
            ],
            owner: [
                { required: true, message: "请输入拥有者", trigger: "blur" },
                { min:1, max:20, message: "输入过长", trigger: "blur" },
            ],
        };

        const newMaterial = reactive({
            id:"M",
            name:undefined,
            count:undefined,
            owner:undefined,
        });

        let detailDialogVisible = ref(false);
        let editDialogVisible = ref(false);
        let addDialogVisible= ref(false);

        const handleSelectionChange = (val) => {
            console.log(val);
            tableData.multipleSelection = val;
            console.log(tableData.multipleSelection);
        };

        const getRowKey = (row) => {
            return row.id;
        };

        // 过滤查询操作
        const handleSearch = () => {
            // displayMaterials 中的内容将会显示在界面的表格中
            // 清空 displayMaterials 数组
            tableData.displayMaterials.splice(0,tableData.displayMaterials.length);
            tableData.materials.forEach((item)=>{
                // 将符合要求的元素添加进 displayMaterials 中，使其显示在前端
                // 模糊匹配：检测字符串是否以指定的子字符串开始
                if(item.id.startsWith(tableData.searchMaterialNumber)&&item.name.startsWith(tableData.searchMaterialName))
                    tableData.displayMaterials.push(item);
            })
        };

        const handleSearchInputReset = () => {
           tableData.searchMaterialNumber = "";
           tableData.searchMaterialName = "";
        }

        const handleDetail = (index, row) => {
            console.log(row);
            // 深拷贝如下
            // 这里最好不直接使用 = ，因为修改失败时，我们不希望 tableData.nowMaterial 的变化引起 row 的变化
            tableData.nowMaterial = JSON.parse(JSON.stringify(row));
        }

        const handleModify = () => {
            console.log(tableData.nowMaterial);
            formRef1.value.validate((valid) => {
                console.log(valid);
                if (valid) {
                    const loading = ElLoading.service({
                        lock: true,
                        text: 'Loading',
                        background: 'rgba(0, 0, 0, 0.7)',
                    })

                    modifyMaterial(tableData.nowMaterial).then((res) => {
                        getMyMaterialData();
                        loading.close();
                        ElMessage.success("修改成功！");
                    }).catch((error) => {
                        loading.close();
                        ElMessage.error("修改失败");
                    });
                } else {
                    ElMessage.error("信息不完整，请更正后提交！");
                    formRef1.value.resetFields();
                    return false;
                }
            });
        }

        const deleteSelectMaterial = () => {
            ElMessageBox.confirm("确定要删除选中吗？", "提示", {
              type: "warning",
            })
                .then(() => {
                    // multipleSelection中包含了选中行的所有信息，这里只用到了id
                    let selectId=[];

                    if(tableData.multipleSelection.length !== 0){
                        (tableData.multipleSelection).forEach(function (item,index) {
                            console.log(item,index);
                            if(item){
                                selectId.push(item.id);
                                tableData.materials.splice(tableData.materials.indexOf(item), 1);
                            }
                        })
                        // id是按选中的先后顺利排列
                        console.log(selectId+'---selectId');
                        let query = selectId;

                        const loading = ElLoading.service({
                            lock: true,
                            text: 'Loading',
                            background: 'rgba(0, 0, 0, 0.7)',
                        })

                        deleteMyMaterial(query).then((res) => {
                            //console.log(res);
                            tableData.multipleSelection.splice(0,tableData.multipleSelection.length);//清空数组
                            //  this.$refs.multipleTable.clearSelection(); vue2的写法
                            multipleTableRef.value.clearSelection(); //清除当前选中
                            tableData.displayMaterials = [].concat(tableData.materials);
                            loading.close();
                            ElMessage.success("删除成功！");
                        }).catch((error) => {
                            console.log(error);
                            loading.close();
                            ElMessage.error("删除失败");
                        });
                    }else{
                        ElMessage.error("请至少选中一个");
                    }

                })
                .catch(() => {});
        }

        const addNewMaterial = () => {
            formRef2.value.validate((valid) => {
                if (valid) {
                    let temp = 0;
                    (tableData.materials).forEach(function (item,index) {
                        console.log(item,index);
                        if(newMaterial.id === item.id){
                            temp = 1;
                            ElMessage.error("编号已存在！");
                            return false;
                        }
                    })
                    if(temp===0){
                        const loading = ElLoading.service({
                            lock: true,
                            text: 'Loading',
                            background: 'rgba(0, 0, 0, 0.7)',
                        })

                        addMaterial(newMaterial).then((res) => {
                            getMyMaterialData();
                            loading.close();
                            ElMessage.success("添加成功！");
                        }).catch((error) => {
                            loading.close();
                            ElMessage.error("添加失败");
                        });
                    }
                } else {
                    ElMessage.error("信息不完整，请更正后提交！");
                    return false;
                }
            });
        }

        const addNewMaterialReset = () => {
            formRef2.value.resetFields();
        }

        const getMyMaterialData = () => {
            getMaterial().then((res) => {
                //multipleTableRef.value.clearSelection();
                tableData.materials=[].concat(res);
                tableData.displayMaterials=[].concat(res);
                console.log(tableData.displayMaterials);
            }).catch((error) => {
                console.log(error);
                ElMessage.error("获取消息数据失败");
            });
        };

        getMyMaterialData();

        return {
            rules,
            formRef1,
            formRef2,
            multipleTableRef,
            tableData,
            newMaterial,
            editDialogVisible,
            detailDialogVisible,
            addDialogVisible,
            handleSearchInputReset,
            handleSelectionChange,
            handleModify,
            getRowKey,
            handleDetail,
            handleSearch,
            deleteSelectMaterial,
            addNewMaterial,
            addNewMaterialReset,
        };
    },
};
</script>

<style>
.handle-box {
  margin-bottom: 20px;
}

.handle-input {
  width: 200px;
  display: inline-block;
}

.mr10 {
  margin-right: 10px;
}

.red {
  color: #ff0000;
}

.green {
  color: #3CB371;
}

.message-title {
  cursor: pointer;
  font-size: 15px;
  width: 10px;
}

.handle-row {
  margin-top: 30px;
}

</style>

