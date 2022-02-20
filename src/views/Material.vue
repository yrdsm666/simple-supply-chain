<template>
    <div class="">
        <div class="crumbs">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item><i class="el-icon-lx-copy"></i>材料管理</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="container">
            <span style="margin-right: 15px; font-size: 15px">材料编号：</span>
            <el-input v-model="tableDate.searchMaterialNumber" placeholder="材料编号" class="handle-input mr10"></el-input>
            <span style="margin-right: 15px; font-size: 15px; margin-left: 30px">材料名称：</span>
            <el-input v-model="tableDate.searchMaterialName" placeholder="材料名称" class="handle-input mr10"></el-input>
            <div style="float: right">
                <el-button icon="el-icon-refresh" @click="handleSearchInputReset()" style="color: #696969">重置</el-button>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch()">搜索</el-button>
            </div>
        </div>
        <div class="container">
            <div>
                <el-table ref="multipleTableRef"
                          :data="tableDate.displayMaterials"
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
                            {{ scope.row.number }}
                        </template>
                    </el-table-column>
                    <el-table-column label="名称">
                        <template #default="scope" >
                            {{ scope.row.name }}
                        </template>
                    </el-table-column>
                    <el-table-column label="类型" prop="type" width="180">
                        <template #default="scope">
                            {{ scope.row.type }}
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
<!--                            <el-button type="text" icon="el-icon-delete" class="red"-->
<!--                                       @click="deleteMaterial(scope.$index)">删除</el-button>-->
                        </template>
                    </el-table-column>
                </el-table>
<!--                <div class="pagination">-->
<!--                    <el-pagination background layout="total, prev, pager, next" :current-page="query.pageIndex"-->
<!--                                   :page-size="tableDate.message.Size" :total="pageTotal" @current-change="handlePageChange"></el-pagination>-->
<!--                </div>-->
                <el-dialog
                    v-model="detailDialogVisible"
                    title="材料详细信息"
                    width="30%"
                >
                    <el-form :model="tableDate.nowMaterial" label-width="70px">
                        <el-form-item label="材料编号">
                            <el-input v-model="tableDate.nowMaterial.number" :readonly="true"></el-input>
                        </el-form-item>
                        <el-form-item label="材料名称">
                          <el-input v-model="tableDate.nowMaterial.name" :readonly="true"></el-input>
                        </el-form-item>
                        <el-form-item label="材料类别">
                          <el-input v-model="tableDate.nowMaterial.type" :readonly="true"></el-input>
                        </el-form-item>
                        <el-form-item label="材料数目">
                          <el-input v-model="tableDate.nowMaterial.count" :readonly="true"></el-input>
                        </el-form-item>
                        <el-form-item label="拥有者">
                            <el-input v-model="tableDate.nowMaterial.owner" :readonly="true"></el-input>
                        </el-form-item>
                        <el-form-item label="描述">
                            <el-input v-model="tableDate.nowMaterial.description" :readonly="true" type="textarea" :rows="3"></el-input>
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
                    <el-form ref="formRef1" :model="tableDate.nowMaterial" :rules="rules" label-width="80px">
                        <el-form-item label="材料编号">
                            <el-input v-model="tableDate.nowMaterial.number" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="材料名称" prop="name">
                            <el-input v-model="tableDate.nowMaterial.name"></el-input>
                        </el-form-item>
                        <el-form-item label="材料类别" prop="type">
                            <el-select v-model="tableDate.nowMaterial.type" placeholder="请选择" style="width: 100%">
                                <el-option label="金属材料" value="金属材料"></el-option>
                                <el-option label="无机非金属材料" value="无机非金属材料"></el-option>
                                <el-option label="复合材料" value="复合材料"></el-option>
                                <el-option label="高分子材料" value="高分子材料"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="材料数目" prop="count">
                            <el-input v-model="tableDate.nowMaterial.count"></el-input>
                        </el-form-item>
                        <el-form-item label="拥有者" prop="owner">
                            <el-input v-model="tableDate.nowMaterial.owner"></el-input>
                        </el-form-item>
                        <el-form-item label="描述">
                            <el-input v-model="tableDate.nowMaterial.description" type="textarea" :rows="3"></el-input>
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
                        <el-form-item label="材料编号" prop="number">
                            <el-input v-model="newMaterial.number">M</el-input>
                        </el-form-item>
                        <el-form-item label="材料名称" prop="name">
                            <el-input v-model="newMaterial.name"></el-input>
                        </el-form-item>
                        <el-form-item label="材料类别" prop="type">
                            <el-select v-model="newMaterial.type" placeholder="请选择" style="width: 100%">
                                <el-option label="金属材料" value="metal"></el-option>
                                <el-option label="无机非金属材料" value="nonmetal"></el-option>
                                <el-option label="复合材料" value="compound"></el-option>
                                <el-option label="高分子材料" value="polymer"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="材料数目" prop="count">
                            <el-input v-model="newMaterial.count"></el-input>
                        </el-form-item>
                        <el-form-item label="拥有者" prop="owner">
                            <el-input v-model="newMaterial.owner"></el-input>
                        </el-form-item>
                        <el-form-item label="描述">
                            <el-input v-model="newMaterial.description" type="textarea" :rows="3"></el-input>
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
                <el-button type="primary" @click="addDialogVisible=true;deleteSelectMaterial">添加</el-button>
                <el-button type="primary" @click="deleteSelectMaterial">删除</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { useRouter } from "vue-router";
import { getMaterial, deleteMyMaterial, modifyMaterial, addMaterial } from "../api/material";

export default {
    name: "tabs",
    setup() {
        // const message = ref("first");
        const multipleTableRef = ref();
        const formRef1 = ref(null);
        const formRef2 = ref(null);
        const tableDate = reactive({
            materials: [
            ],
            displayMaterials: [],
            nowMaterial: undefined,
            multipleSelection: [],
            searchMaterialNumber: "",
            searchMaterialName: "",
        });

        const rules = {
            number: [
                { required: true, message: "请输入编号", trigger: "blur" },
                { min:1, max:20, message: "输入过长", trigger: "blur" },
            ],
            name: [
                { required: true, message: "请输入名称", trigger: "blur" },
                { min:1, max:20, message: "名称过长", trigger: "blur" },
            ],
            type: [
                { required: true, message: "请选择类型", trigger: "blur" },
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
            number:"M",
            name:undefined,
            type:undefined,
            count:undefined,
            owner:undefined,
            description:undefined,
        });

        let detailDialogVisible = ref(false);
        let editDialogVisible = ref(false);
        let addDialogVisible= ref(false);

        // const messageAppear = ( rowData ) => {
        //     // console.log(rowData);
        //     if (rowData.type==='text'){
        //         // dialogVisible = true;
        //         tableDate.now_message = rowData.content;
        //     }else if(rowData.type==='file'){
        //         window.open(rowData.url,"_blank");
        //     }else{
        //         ElMessage.error("类型错误");
        //     }
        // };

        const handleSelectionChange = (val) => {
            console.log(val);
            tableDate.multipleSelection = val;
            console.log(tableDate.multipleSelection);
        };

        const getRowKey = (row) => {
            return row.id;
        };

        // 查询操作
        const handleSearch = () => {
            //getMyMaterialData();
            let temp = [].concat(tableDate.materials);
            // 清空数组
            tableDate.displayMaterials.splice(0,tableDate.displayMaterials.length);
            for (let index in temp){
                if(tableDate.searchMaterialNumber !== "" && tableDate.searchMaterialName === ""){
                    if(temp[index].number === tableDate.searchMaterialNumber){
                        // 添加符合要求的元素
                        tableDate.displayMaterials.splice(index, 0, temp[index]);
                    }
                }else if(tableDate.searchMaterialNumber === "" && tableDate.searchMaterialName !== ""){
                    if(temp[index].name === tableDate.searchMaterialName){
                        // 添加符合要求的元素
                        tableDate.displayMaterials.splice(index, 0, temp[index]);
                    }
                }else if(tableDate.searchMaterialNumber !== "" && tableDate.searchMaterialName !== ""){
                    if(temp[index].number === tableDate.searchMaterialNumber && temp[index].name === tableDate.searchMaterialName){
                        // 添加符合要求的元素
                        tableDate.displayMaterials.splice(index, 0, temp[index]);
                    }
                }else{
                    tableDate.displayMaterials = [].concat(tableDate.materials);
                }
            }
            multipleTableRef.value.clearSelection();
            //tableDate.multipleSelection.splice(0,tableDate.multipleSelection.length);//清空数组
            console.log(tableDate.materials);
        };

        const handleSearchInputReset = () => {
           tableDate.searchMaterialNumber = "";
           tableDate.searchMaterialName = "";
        }

        const handleDetail = (index, row) => {
            console.log(row);
            // 深拷贝如下
            // 这里最好不直接使用 = ，因为修改失败时，我们不希望 tableDate.nowMaterial 的变化引起 row 的变化
            tableDate.nowMaterial = JSON.parse(JSON.stringify(row));
        }

        const handleModify = () => {
            console.log(tableDate.nowMaterial);
            formRef1.value.validate((valid) => {
                console.log(valid);
                if (valid) {
                    modifyMaterial(tableDate.nowMaterial).then((res) => {
                        getMyMaterialData();
                        ElMessage.success("修改成功！");
                    }).catch((error) => {
                        // //修改失败时 row 也变了，但是不应该变，所以重新赋值一下
                        // tableDate.displayMaterials = [].concat(tableDate.materials);
                        // console.log(tableDate.materials);
                        // console.log(tableDate.displayMaterials);
                        // console.log(error);
                        ElMessage.error("修改失败");
                    });
                } else {
                    ElMessage.error("信息不完整，请更正后提交！");
                    formRef1.value.resetFields();
                    return false;
                }
            });
        }
        // const handleRead = (index) => {
        //     const item = state.message.splice(index, 1);
        //     console.log(item);
        //     state.read = item.concat(state.read);
        // };
        // const handleDel = (index) => {
        //     const item = state.read.splice(index, 1);
        //     state.recycle = item.concat(state.recycle);
        // };
        // const handleRestore = (index) => {
        //     const item = state.recycle.splice(index, 1);
        //     state.read = item.concat(state.read);
        // };
        // const deleteMaterial = (index) => {
        //     ElMessageBox.confirm("确定要删除吗？", "提示", {
        //       type: "warning",
        //     })
        //         .then(() => {
        //             const item = tableDate.materials.splice(index, 1);
        //             console.log(item);
        //             console.log(item[0].id);
        //             deleteMyMaterial({userId: "123", materialsId: [item[0].id]}).then((res) => {
        //                 console.log('res:',res);
        //
        //                 //在已选列表multipleSelection中清除刚刚被删的行
        //                 let a = tableDate.multipleSelection.indexOf(item[0]);
        //                 if(a !== -1){
        //                     tableDate.multipleSelection.splice(a, 1);
        //                 }
        //                 console.log(tableDate.multipleSelection);
        //                 ElMessage.success("删除成功！");
        //
        //             }).catch((error) => {
        //                 console.log(error);
        //                 ElMessage.error("删除失败");
        //             });
        //         })
        //         .catch(() => {});
        // }

        // const multipleTable = ref(null);
        // onMounted函数每勾选一次便会执行一次
        // onMounted(() => {
        //     console.log(multipleTable.value) // 此时在mounted周期中可以访问到ref
        //     //multipleTable.value.clearSelection();
        // })

        const deleteSelectMaterial = () => {
            ElMessageBox.confirm("确定要删除选中吗？", "提示", {
              type: "warning",
            })
                .then(() => {
                    // multipleSelection中包含了选中行的所有信息，这里只用到了id
                    let selectId=[];

                    if(tableDate.multipleSelection.length !== 0){
                        (tableDate.multipleSelection).forEach(function (item,index) {
                            console.log(item,index);
                            if(item){
                                selectId.push(item.id);
                                tableDate.materials.splice(tableDate.materials.indexOf(item), 1);
                            }
                        })
                        // id是按选中的先后顺利排列
                        console.log(selectId+'---selectId');
                        let query = {userId: "123", materialsId: selectId};
                        deleteMyMaterial(query).then((res) => {
                            //console.log(res);
                            tableDate.multipleSelection.splice(0,tableDate.multipleSelection.length);//清空数组
                            //  this.$refs.multipleTable.clearSelection(); vue2的写法
                            multipleTableRef.value.clearSelection(); //清除当前选中
                            tableDate.displayMaterials = [].concat(tableDate.materials);
                            ElMessage.success("删除成功！");
                        }).catch((error) => {
                            console.log(error);
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
                    (tableDate.materials).forEach(function (item,index) {
                        console.log(item,index);
                        if(newMaterial.number === item.number){
                            temp = 1;
                            ElMessage.error("编号已存在！");
                            return false;
                        }
                    })
                    if(temp===0){
                        addMaterial(newMaterial).then((res) => {
                            getMyMaterialData();
                            ElMessage.success("添加成功！");
                        }).catch((error) => {
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
            getMaterial({userId: "123"}).then((res) => {
                //multipleTableRef.value.clearSelection();
                tableDate.materials=[].concat(res);
                tableDate.displayMaterials=[].concat(res);
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
            tableDate,
            newMaterial,
            editDialogVisible,
            detailDialogVisible,
            addDialogVisible,
            // multipleTable,
            // messageAppear,
            handleSearchInputReset,
            handleSelectionChange,
            handleModify,
            getRowKey,
            // handleRead,
            // handleDel,
            // handleRestore,
            handleDetail,
            handleSearch,
            // deleteMaterial,
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

