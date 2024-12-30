<!--
 * @Descripttion: (送货单/DeliveryOrder)
 * @Author: (admin)
 * @Date: (2024-12-03)
-->
<template>
  <div>
    <div>
      <el-form :model="DeliveryOrderqueryParams" label-position="right" inline ref="DeliveryOrderqueryRef"
        v-show="DeliveryOrdershowSearch" @submit.prevent>
        <el-form-item label="单据号" prop="billCode">
          <el-input v-model="DeliveryOrderqueryParams.billCode" placeholder="请输入单据号" />
        </el-form-item>
        <el-form-item label="发票号" prop="invoiceNo">
          <el-input v-model="DeliveryOrderqueryParams.invoiceNo" placeholder="请输入发票号" />
        </el-form-item>
        <el-form-item label="创建时间">
          <el-date-picker v-model="DeliveryOrderdateRangeCreateTime" type="datetimerange" start-placeholder="开始日期"
            end-placeholder="结束日期" value-format="YYYY-MM-DD HH:mm:ss" :default-time="DeliveryOrderdefaultTime"
            :shortcuts="dateOptions">
          </el-date-picker>
        </el-form-item>
        <!-- <el-form-item label="推送时间">
          <el-date-picker v-model="DeliveryOrderdateRangePushTime" type="datetimerange" start-placeholder="开始日期"
            end-placeholder="结束日期" value-format="YYYY-MM-DD HH:mm:ss" :default-time="DeliveryOrderdefaultTime"
            :shortcuts="dateOptions">
          </el-date-picker>
        </el-form-item> -->
        <el-form-item>
          <el-button icon="search" type="primary" @click="DeliveryOrderhandleQuery">{{ $t('btn.search') }}</el-button>
          <el-button icon="refresh" @click="DeliveryOrderresetQuery">{{ $t('btn.reset')
            }}</el-button>
        </el-form-item>
      </el-form>
      <!-- 工具区域 -->
      <el-row :gutter="15" class="mb10">
        <el-col :span="1.5">
          <el-button type="primary" v-hasPermi="['deliveryorder:add']" plain icon="plus"
            @click="DeliveryOrderhandleAdd">
            {{ $t('btn.add') }}
          </el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button type="success" :disabled="DeliveryOrdersingle" v-hasPermi="['deliveryorder:edit']" plain
            icon="edit" @click="DeliveryOrderhandleUpdate">
            {{ $t('btn.edit') }}
          </el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button type="danger" :disabled="DeliveryOrdermultiple" v-hasPermi="['deliveryorder:delete']" plain
            icon="delete" @click="DeliveryOrderhandleDelete">
            {{ $t('btn.delete') }}
          </el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button type="danger" v-hasPermi="['deliveryorder:delete']" plain icon="delete"
            @click="DeliveryOrderhandleClear">
            {{ $t('btn.clean') }}
          </el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button type="danger" :disabled="DeliveryOrderids == null" v-hasPermi="['deliveryorder:add']" plain
            icon="success" @click="tuisong">
            推送
          </el-button>
        </el-col>
        <!-- <el-col :span="1.5">
          <el-dropdown trigger="click" v-hasPermi="['deliveryorder:import']">
            <el-button type="primary" plain icon="Upload">
              {{ $t('btn.import') }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="upload">
                  <importData templateUrl="business/DeliveryOrder/importTemplate"
                    importUrl="/business/DeliveryOrder/importData" @success="DeliveryOrderhandleFileSuccess">
                  </importData>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
</el-dropdown>
</el-col>
<el-col :span="1.5">
  <el-button type="warning" plain icon="download" @click="DeliveryOrderhandleExport"
    v-hasPermi="['deliveryorder:export']">
    {{ $t('btn.export') }}
  </el-button>
</el-col> -->
        <right-toolbar v-model:showSearch="DeliveryOrdershowSearch" @queryTable="DeliveryOrdergetList"
          :columns="DeliveryOrdercolumns"></right-toolbar>
      </el-row>

      <el-table @row-click="DeliveryOrderDrugdatalist" :data="DeliveryOrderdataList" v-loading="DeliveryOrderloading"
        ref="DeliveryOrdertable" border header-cell-class-name="el-table-header-cell" highlight-current-row
        @sort-change="DeliveryOrdersortChange" @selection-change="DeliveryOrderhandleSelectionChange">
        <el-table-column type="selection" width="50" align="center" />
        <el-table-column prop="id" label="Id" align="center" v-if="DeliveryOrdercolumns.showColumn('id')" />
        <el-table-column prop="stockId" label="备货单id" align="center"
          v-if="DeliveryOrdercolumns.showColumn('stockId')" />
        <el-table-column prop="drugId" label="药品id" align="center" v-if="DeliveryOrdercolumns.showColumn('drugId')" />
        <el-table-column prop="billCode" label="单据号" align="center" :show-overflow-tooltip="true"
          v-if="DeliveryOrdercolumns.showColumn('billCode')" />
        <el-table-column prop="invoiceNo" label="发票号" align="center" :show-overflow-tooltip="true"
          v-if="DeliveryOrdercolumns.showColumn('invoiceNo')" />
        <el-table-column prop="deliveryDetails" label="单据详情" align="center" :show-overflow-tooltip="true"
          v-if="DeliveryOrdercolumns.showColumn('deliveryDetails')" />
        <el-table-column prop="remarks" label="备注" align="center" :show-overflow-tooltip="true"
          v-if="DeliveryOrdercolumns.showColumn('remarks')" />
        <el-table-column prop="DeliveryOrderstates" label="状态" align="center"
          v-if="DeliveryOrdercolumns.showColumn('DeliveryOrderstates')">
          <template #default="scope">
            <dict-tag :options="DeliveryOrderoptions.DeliveryOrderstatesOptions"
              :value="scope.row.DeliveryOrderstates" />
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" :show-overflow-tooltip="true"
          v-if="DeliveryOrdercolumns.showColumn('createTime')" />
        <el-table-column prop="pushTime" label="推送时间" :show-overflow-tooltip="true"
          v-if="DeliveryOrdercolumns.showColumn('pushTime')" />
        <el-table-column prop="createdBy" label="推送时间" :show-overflow-tooltip="true"
          v-if="DeliveryOrdercolumns.showColumn('createdBy')" />
        <el-table-column label="操作" width="160">
          <template #default="scope">
            <el-button type="primary" size="small" icon="view" DeliveryOrdertitle="详情"
              @click="DeliveryOrderhandlePreview(scope.row)"></el-button>
            <el-button type="success" size="small" icon="edit" DeliveryOrdertitle="编辑"
              v-hasPermi="['deliveryorder:edit']" @click="DeliveryOrderhandleUpdate(scope.row)"></el-button>
            <el-button type="danger" size="small" icon="delete" DeliveryOrdertitle="删除"
              v-hasPermi="['deliveryorder:delete']" @click="DeliveryOrderhandleDelete(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination :total="DeliveryOrdertotal" v-model:page="DeliveryOrderqueryParams.pageNum"
        v-model:limit="DeliveryOrderqueryParams.pageSize" @pagination="DeliveryOrdergetList" />

      <el-dialog :title="DeliveryOrdertitle" :lock-scroll="false" v-model="DeliveryOrderopen">
        <el-form ref="DeliveryOrderformRef" :model="DeliveryOrderform" :rules="DeliveryOrderrules" label-width="100px">
          <el-row :gutter="20">

            <el-col :lg="12" v-if="DeliveryOrderopertype != 1">
              <el-form-item label="Id" prop="id">
                <el-input-number v-model.number="DeliveryOrderform.id" controls-position="right" placeholder="请输入Id"
                  :disabled="true" />
              </el-form-item>
            </el-col>

            <!-- <el-col :lg="12">
              <el-form-item label="备货单id" prop="stockId">
                <el-input v-model.number="DeliveryOrderform.stockId" placeholder="请输入备货单id" />
              </el-form-item>
            </el-col>

            <el-col :lg="12">
              <el-form-item label="药品id" prop="drugId">
                <el-input v-model.number="DeliveryOrderform.drugId" placeholder="请输入药品id" />
              </el-form-item>
            </el-col> -->

            <el-col :lg="12">
              <el-form-item label="单据号" prop="billCode">
                <el-input v-model="DeliveryOrderform.billCode" placeholder="请输入单据号" />
              </el-form-item>
            </el-col>

            <el-col :lg="12">
              <el-form-item label="发票号" prop="invoiceNo">
                <el-input v-model="DeliveryOrderform.invoiceNo" placeholder="请输入发票号" />
              </el-form-item>
            </el-col>

            <el-col :lg="12">
              <el-form-item label="单据详情" prop="deliveryDetails">
                <el-input v-model="DeliveryOrderform.deliveryDetails" placeholder="请输入单据详情" />
              </el-form-item>
            </el-col>
            <el-col :lg="12">
              <el-form-item label="创建人" prop="remarks">
                <el-input v-model="DeliveryOrderform.createdBy" placeholder="请输入创建人" />
              </el-form-item>
            </el-col>
            <el-col :lg="12">
              <el-form-item label="备注" prop="remarks">
                <el-input v-model="DeliveryOrderform.remarks" placeholder="请输入备注" />
              </el-form-item>
            </el-col>
            <!-- <el-col :lg="12">
              <el-form-item label="备注" prop="remarks">
                <el-input v-model="DeliveryOrderform.remarks" placeholder="请输入备注" />
              </el-form-item>
            </el-col>  -->
            <!-- <el-col :lg="12">
              <el-form-item label="状态" prop="DeliveryOrderstates">
                <el-radio-group v-model="DeliveryOrderform.DeliveryOrderstates">
                  <el-radio v-for="item in DeliveryOrderoptions.DeliveryOrderstatesOptions" :key="item.dictValue"
                    :value="item.dictValue">
                    {{ item.dictLabel }}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col> -->

            <!-- <el-col :lg="12">
              <el-form-item label="创建时间" prop="createTime">
                <el-date-picker v-model="DeliveryOrderform.createTime" type="datetime" placeholder="选择日期时间"
                  value-format="YYYY-MM-DD HH:mm:ss">
                </el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :lg="12">
              <el-form-item label="推送时间" prop="pushTime">
                <el-date-picker v-model="DeliveryOrderform.pushTime" type="datetime" placeholder="选择日期时间"
                  value-format="YYYY-MM-DD HH:mm:ss">
                </el-date-picker>
              </el-form-item>
            </el-col> -->
          </el-row>
        </el-form>
        <template #footer v-if="DeliveryOrderopertype != 3">
          <el-button text @click="DeliveryOrdercancel">{{ $t('btn.cancel') }}</el-button>
          <el-button type="primary" @click="DeliveryOrdersubmitForm">{{ $t('btn.submit') }}</el-button>
        </template>
      </el-dialog>
    </div>
    <div class="table-content">
      <div class="table-item1">
        <div>
          <el-form :model="DeliveryDrugqueryParams" label-position="right" inline ref="DeliveryDrugqueryRef"
            v-show="DeliveryDrugshowSearch" @submit.prevent>
            <!-- <el-form-item label="送货单" prop="deliveryId">
              <el-input v-model.number="DeliveryDrugqueryParams.deliveryId" placeholder="请输入送货单" />
            </el-form-item> -->
            <!-- <el-form-item label="药品id" prop="drugId">
              <el-input v-model.number="DeliveryDrugqueryParams.drugId" placeholder="请输入药品id" />
            </el-form-item> -->
            <el-form-item label="药品名称" prop="drugName">
              <el-input v-model="DeliveryDrugqueryParams.drugName" placeholder="请输入药品名称" />
            </el-form-item>
            <el-form-item label="药品编号" prop="drugCode">
              <el-input v-model="DeliveryDrugqueryParams.drugCode" placeholder="请输入药品编号" />
            </el-form-item>
            <el-form-item label="药品批号" prop="drugBatchNo">
              <el-input v-model="DeliveryDrugqueryParams.drugBatchNo" placeholder="请输入药品批号" />
            </el-form-item>
            <el-form-item>
              <el-button icon="search" type="primary" @click="DeliveryDrughandleQuery">{{ $t('btn.search')
                }}</el-button>
              <el-button icon="refresh" @click="DeliveryDrugresetQuery">{{ $t('btn.reset')
                }}</el-button>
            </el-form-item>
          </el-form>
          <!-- 工具区域 -->
          <el-row :gutter="15" class="mb10">
            <el-col :span="1.5">
              <el-button type="primary" v-hasPermi="['deliveryorderdrug:add']" plain icon="plus"
                @click="DeliveryDrughandleAdd">
                {{ $t('btn.add') }}
              </el-button>
            </el-col>
            <el-col :span="1.5">
              <el-button type="success" :disabled="single" v-hasPermi="['deliveryorderdrug:edit']" plain icon="edit"
                @click="DeliveryDrughandleUpdate">
                {{ $t('btn.edit') }}
              </el-button>
            </el-col>
            <el-col :span="1.5">
              <el-button type="danger" :disabled="multiple" v-hasPermi="['deliveryorderdrug:delete']" plain
                icon="delete" @click="DeliveryDrughandleDelete">
                {{ $t('btn.delete') }}
              </el-button>
            </el-col>
            <!-- <el-col :span="1.5">
              <el-button type="danger" v-hasPermi="['deliveryorderdrug:delete']" plain icon="delete"
                @click="DeliveryDrughandleClear">
                {{ $t('btn.clean') }}
              </el-button>
            </el-col> -->
            <!-- <el-col :span="1.5">
                <el-dropdown trigger="click" v-hasPermi="['deliveryorderdrug:import']">
                  <el-button type="primary" plain icon="Upload">
                    {{ $t('btn.import') }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
                  </el-button>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item command="upload">
                        <importData templateUrl="business/DeliveryOrderDrug/importTemplate"
                          importUrl="/business/DeliveryOrderDrug/importData" @success="DeliveryDrughandleFileSuccess">
                        </importData>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </el-col>
              <el-col :span="1.5">
                <el-button type="warning" plain icon="download" @click="DeliveryDrughandleExport"
                  v-hasPermi="['deliveryorderdrug:export']">
                  {{ $t('btn.export') }}
                </el-button>
              </el-col> -->
            <el-col :span="1.5">
              <el-button type="primary" v-hasPermi="['deliveryorderdrug:add']" plain icon="plus" @click="handleAdd">
                添加明细
              </el-button>
            </el-col>
            <right-toolbar v-model:showSearch="DeliveryDrugshowSearch" @queryTable="DeliveryDruggetList"
              :columns="DeliveryDrugcolumns"></right-toolbar>
          </el-row>

          <el-table @row-click="CODEDrugdatalist" :data="DeliveryDrugdataList" v-loading="DeliveryDrugloading"
            ref="DeliveryDrugtable" border header-cell-class-name="el-table-header-cell" highlight-current-row
            @sort-change="DeliveryDrugsortChange" @selection-change="DeliveryDrughandleSelectionChange">
            <el-table-column type="selection" width="50" align="center" />
            <!-- <el-table-column prop="id" label="Id，自增主键" align="center" v-if="DeliveryDrugcolumns.showColumn('id')" /> -->
            <!-- <el-table-column prop="deliveryId" label="送货单" align="center"
              v-if="DeliveryDrugcolumns.showColumn('deliveryId')" /> -->
            <el-table-column prop="drugId" label="药品id" align="center"
              v-if="DeliveryDrugcolumns.showColumn('drugId')" />
            <el-table-column prop="drugName" label="药品名称" align="center" :show-overflow-tooltip="true"
              v-if="DeliveryDrugcolumns.showColumn('drugName')" />
            <el-table-column prop="drugCode" label="药品编号" align="center" :show-overflow-tooltip="true"
              v-if="DeliveryDrugcolumns.showColumn('drugCode')" />
            <el-table-column prop="drugSpecification" label="药品规格" align="center" :show-overflow-tooltip="true"
              v-if="DeliveryDrugcolumns.showColumn('drugSpecification')" />
            <el-table-column prop="drugBatchNo" label="药品批号" align="center" :show-overflow-tooltip="true"
              v-if="DeliveryDrugcolumns.showColumn('drugBatchNo')" />
            <el-table-column prop="manufacturer" label="生产厂家" align="center" :show-overflow-tooltip="true"
              v-if="DeliveryDrugcolumns.showColumn('manufacturer')" />
            <!-- <el-table-column prop="unitPrice" label="单价" align="center"
              v-if="DeliveryDrugcolumns.showColumn('unitPrice')" /> -->
            <el-table-column prop="unitPrice" label="价格" align="center" :show-overflow-tooltip="true"
              v-if="Drugcolumns.showColumn('unitPrice')">
              <template #default="{ row }">
                <el-input v-model="row.unitPrice" size="small" @blur="DrugQuantityChange(row)" class="inputs" />
              </template>
            </el-table-column>
            <el-table-column prop="drugQuantity" label="药品数量" align="center"
              v-if="DeliveryDrugcolumns.showColumn('drugQuantity')">
              <template #default="{ row }">
                <el-input v-model="row.drugQuantity" size="small" @blur="DrugQuantityChange(row)" class="inputs" />
              </template>
            </el-table-column>
            <el-table-column prop="minunit" label="最小单位" align="center" :show-overflow-tooltip="true"
              v-if="DeliveryDrugcolumns.showColumn('minunit')" />
            <el-table-column prop="packageRatio" label="转换系数" align="center"
              v-if="DeliveryDrugcolumns.showColumn('packageRatio')" />
            <el-table-column prop="packageUnit" label="包装单位" align="center" :show-overflow-tooltip="true"
              v-if="DeliveryDrugcolumns.showColumn('packageUnit')" />
            <el-table-column prop="remarks" label="备注" align="center" :show-overflow-tooltip="true"
              v-if="DeliveryDrugcolumns.showColumn('remarks')" />
            <el-table-column prop="remarks" label="生产日期" align="center" :show-overflow-tooltip="true"
              v-if="DeliveryDrugcolumns.showColumn('exprie')" />
            <el-table-column prop="remarks" label="有效期" align="center" :show-overflow-tooltip="true"
              v-if="DeliveryDrugcolumns.showColumn('dateOfManufacture')" />

            <el-table-column label="操作" width="160">
              <template #default="scope">
                <!-- <el-button type="primary" size="small" icon="view" title="详情"
                  @click="DeliveryDrughandlePreview(scope.row)"></el-button> -->
                <el-button type="success" size="small" icon="edit" title="编辑" v-hasPermi="['deliveryorderdrug:edit']"
                  @click="DeliveryDrughandleUpdate(scope.row)"></el-button>
                <el-button type="danger" size="small" icon="delete" title="删除" v-hasPermi="['deliveryorderdrug:delete']"
                  @click="DeliveryDrughandleDelete(scope.row)"></el-button>
                <el-button type="success" size="small" icon="FullScreen" title="扫码添加"
                  v-hasPermi="['deliveryorderdrug:add']" @click="CodeScreenAdd(scope.row)"></el-button>
                <el-button type="primary" size="small" icon="edit" title="手动添加" v-hasPermi="['deliveryorderdrug:add']"
                  @click="CodehandleAdd(scope.row)"></el-button>
              </template>
            </el-table-column>
          </el-table>
          <pagination :total="DeliveryDrugtotal" v-model:page="DeliveryDrugqueryParams.pageNum"
            v-model:limit="DeliveryDrugqueryParams.pageSize" @pagination="DeliveryDruggetList" />


          <el-dialog :title="DeliveryDrugtitle" :lock-scroll="false" v-model="DeliveryDrugopen">
            <el-form ref="DeliveryDrugformRef" :model="DeliveryDrugform" :DeliveryDrugrules="DeliveryDrugrules"
              label-width="100px">
              <el-row :gutter="20">

                <!-- <el-col :lg="12" v-if="DeliveryDrugopertype != 1">
                  <el-form-item label="Id，自增主键" prop="id">
                    <el-input-number v-model.number="DeliveryDrugform.id" controls-position="right"
                      placeholder="请输入Id，自增主键" :disabled="true" />
                  </el-form-item>
                </el-col> -->

                <!-- <el-col :lg="12">
                  <el-form-item label="送货单" prop="deliveryId">
                    <el-input v-model.number="DeliveryDrugform.deliveryId" placeholder="请输入送货单" />
                  </el-form-item>
                </el-col> -->

                <!-- <el-col :lg="12">
                  <el-form-item label="药品id" prop="drugId">
                    <el-input v-model.number="DeliveryDrugform.drugId" placeholder="请输入药品id" />
                  </el-form-item>
                </el-col> -->

                <el-col :lg="12">
                  <el-form-item label="药品名称" prop="drugName">
                    <el-input v-model="DeliveryDrugform.drugName" placeholder="请输入药品名称" />
                  </el-form-item>
                </el-col>

                <el-col :lg="12">
                  <el-form-item label="药品编号" prop="drugCode">
                    <el-input v-model="DeliveryDrugform.drugCode" placeholder="请输入药品编号" />
                  </el-form-item>
                </el-col>

                <el-col :lg="12">
                  <el-form-item label="药品规格" prop="drugSpecification">
                    <el-input v-model="DeliveryDrugform.drugSpecification" placeholder="请输入药品规格" />
                  </el-form-item>
                </el-col>

                <el-col :lg="12">
                  <el-form-item label="药品批号" prop="drugBatchNo">
                    <el-input v-model="DeliveryDrugform.drugBatchNo" placeholder="请输入药品批号" />
                  </el-form-item>
                </el-col>

                <el-col :lg="12">
                  <el-form-item label="生产厂家" prop="manufacturer">
                    <el-input v-model="DeliveryDrugform.manufacturer" placeholder="请输入生产厂家" />
                  </el-form-item>
                </el-col>

                <el-col :lg="12">
                  <el-form-item label="单价" prop="unitPrice">
                    <el-input v-model="DeliveryDrugform.unitPrice" placeholder="请输入单价" />
                  </el-form-item>
                </el-col>

                <el-col :lg="12">
                  <el-form-item label="药品数量" prop="drugQuantity">
                    <el-input v-model.number="DeliveryDrugform.drugQuantity" placeholder="请输入药品数量" />
                  </el-form-item>
                </el-col>

                <el-col :lg="12">
                  <el-form-item label="备注" prop="remarks">
                    <el-input v-model="DeliveryDrugform.remarks" placeholder="请输入备注" />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <template #footer v-if="DeliveryDrugopertype != 3">
              <el-button text @click="DeliveryDrugcancel">{{ $t('btn.cancel') }}</el-button>
              <el-button type="primary" @click="DeliveryDrugsubmitForm">{{ $t('btn.submit') }}</el-button>
            </template>
          </el-dialog>
        </div>
      </div>
      <div class="table-item2">
        <div>
          <el-form :model="GYSCodequeryParams" label-position="right" inline ref="GYSCodequeryRef"
            v-show="GYSCodeshowSearch" @submit.prevent>
            <!-- <el-form-item label="送货单id" prop="deliveryid">
              <el-input v-model.number="GYSCodequeryParams.deliveryid" placeholder="请输入送货单id" />
            </el-form-item>
            <el-form-item label="药品id" prop="drugId">
              <el-input v-model.number="GYSCodequeryParams.drugId" placeholder="请输入药品id" />
            </el-form-item>
            <el-form-item label="追溯码" prop="code">
              <el-input v-model="GYSCodequeryParams.code" placeholder="请输入追溯码" />
            </el-form-item>
            <el-form-item label="药品名称" prop="physicName">
              <el-input v-model="GYSCodequeryParams.physicName" placeholder="请输入药品名称" />
            </el-form-item>
            <el-form-item label="送货药品" prop="inDeliveryId">
              <el-input v-model.number="GYSCodequeryParams.inDeliveryId" placeholder="请输入送货药品" />
            </el-form-item>
            <el-form-item label="医嘱id" prop="medicalAdviceId">
              <el-input v-model.number="GYSCodequeryParams.medicalAdviceId" placeholder="请输入医嘱id" />
            </el-form-item>
            <el-form-item label="发票号" prop="invoiceCode">
              <el-input v-model="GYSCodequeryParams.invoiceCode" placeholder="请输入发票号" />
            </el-form-item>
            <el-form-item label="父码" prop="parentCode">
              <el-input v-model="GYSCodequeryParams.parentCode" placeholder="请输入父码" />
            </el-form-item> -->
            <el-form-item>
              <el-button icon="search" type="primary" @click="GYSCodehandleQuery">{{ $t('btn.search') }}</el-button>
              <el-button icon="refresh" @click="GYSCoderesetQuery">{{ $t('btn.reset') }}</el-button>
            </el-form-item>
          </el-form>
          <!-- 工具区域 -->
          <el-row :gutter="15" class="mb10">
            <el-col :span="1.5">
              <el-button type="primary" v-hasPermi="['gyscodedetails:add']" plain icon="plus" @click="GYSCodehandleAdd">
                {{ $t('btn.add') }}
              </el-button>
            </el-col>
            <el-col :span="1.5">
              <el-button type="success" :disabled="GYSCodesingle" v-hasPermi="['gyscodedetails:edit']" plain icon="edit"
                @click="GYSCodehandleUpdate">
                {{ $t('btn.edit') }}
              </el-button>
            </el-col>
            <el-col :span="1.5">
              <el-button type="danger" :disabled="GYSCodemultiple" v-hasPermi="['gyscodedetails:delete']" plain
                icon="delete" @click="GYSCodehandleDelete">
                {{ $t('btn.delete') }}
              </el-button>
            </el-col>
            <el-col :span="1.5">
              <el-button type="danger" v-hasPermi="['gyscodedetails:delete']" plain icon="delete"
                @click="GYSCodehandleClear">
                {{ $t('btn.clean') }}
              </el-button>
            </el-col>
            <el-col :span="1.5">
              <el-dropdown trigger="click" v-hasPermi="['gyscodedetails:import']">
                <el-button type="primary" plain icon="Upload">
                  {{ $t('btn.import') }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
                </el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item command="upload">
                      <importData templateUrl="business/GYSCodeDetails/importTemplate"
                        importUrl="/business/GYSCodeDetails/importData" @success="GYSCodehandleFileSuccess">
                      </importData>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </el-col>
            <el-col :span="1.5">
              <el-button type="warning" plain icon="download" @click="GYSCodehandleExport"
                v-hasPermi="['gyscodedetails:export']">
                {{ $t('btn.export') }}
              </el-button>
            </el-col>
            <right-toolbar v-model:showSearch="GYSCodeshowSearch" @queryTable="GYSCodegetList"
              :columns="GYSCodecolumns"></right-toolbar>
          </el-row>

          <el-table :data="GYSCodedataList" v-loading="GYSCodeloading" ref="GYSCodetable" border
            header-cell-class-name="el-table-header-cell" highlight-current-row @sort-change="GYSCodesortChange"
            @selection-change="GYSCodehandleSelectionChange">
            <el-table-column type="selection" width="50" align="center" />
            <el-table-column prop="id" label="Id" align="center" v-if="GYSCodecolumns.showColumn('id')" />
            <el-table-column prop="deliveryid" label="送货单id" align="center"
              v-if="GYSCodecolumns.showColumn('deliveryid')" />
            <el-table-column prop="drugId" label="药品id" align="center" v-if="GYSCodecolumns.showColumn('drugId')" />
            <el-table-column prop="code" label="追溯码" align="center" :show-overflow-tooltip="true"
              v-if="GYSCodecolumns.showColumn('code')" />
            <el-table-column prop="physicTypeDesc" label="药品类型描述" align="center" :show-overflow-tooltip="true"
              v-if="GYSCodecolumns.showColumn('physicTypeDesc')" />
            <el-table-column prop="refEntId" label="企业id" align="center" :show-overflow-tooltip="true"
              v-if="GYSCodecolumns.showColumn('refEntId')" />
            <el-table-column prop="entName" label="企业名称" align="center" :show-overflow-tooltip="true"
              v-if="GYSCodecolumns.showColumn('entName')" />
            <el-table-column prop="packageLevel" label="码等级" align="center" :show-overflow-tooltip="true"
              v-if="GYSCodecolumns.showColumn('packageLevel')" />
            <el-table-column prop="physicName" label="药品名称" align="center" :show-overflow-tooltip="true"
              v-if="GYSCodecolumns.showColumn('physicName')" />
            <el-table-column prop="exprie" label="有效期" align="center" :show-overflow-tooltip="true"
              v-if="GYSCodecolumns.showColumn('exprie')" />
            <el-table-column prop="drugEntBaseInfoId" label="药品id" align="center" :show-overflow-tooltip="true"
              v-if="GYSCodecolumns.showColumn('drugEntBaseInfoId')" />
            <el-table-column prop="approvalLicenceNo" label="批准文号" align="center" :show-overflow-tooltip="true"
              v-if="GYSCodecolumns.showColumn('approvalLicenceNo')" />
            <el-table-column prop="pkgSpecCrit" label="包装规格" align="center" :show-overflow-tooltip="true"
              v-if="GYSCodecolumns.showColumn('pkgSpecCrit')" />
            <el-table-column prop="prepnSpec" label="制剂规格" align="center" :show-overflow-tooltip="true"
              v-if="GYSCodecolumns.showColumn('prepnSpec')" />
            <el-table-column prop="prepnTypeDesc" label="剂型描述" align="center" :show-overflow-tooltip="true"
              v-if="GYSCodecolumns.showColumn('prepnTypeDesc')" />
            <el-table-column prop="produceDateStr" label="生产日期" align="center" :show-overflow-tooltip="true"
              v-if="GYSCodecolumns.showColumn('produceDateStr')" />
            <el-table-column prop="pkgAmount" label="最小包装数量" align="center" :show-overflow-tooltip="true"
              v-if="GYSCodecolumns.showColumn('pkgAmount')" />
            <el-table-column prop="expireDate" label="有效期至" align="center" :show-overflow-tooltip="true"
              v-if="GYSCodecolumns.showColumn('expireDate')" />
            <el-table-column prop="batchNo" label="批次号" align="center" :show-overflow-tooltip="true"
              v-if="GYSCodecolumns.showColumn('batchNo')" />
            <el-table-column prop="storageTime" label="扫码入库时间" align="center" :show-overflow-tooltip="true"
              v-if="GYSCodecolumns.showColumn('storageTime')" />
            <el-table-column prop="inDeliveryId" label="送货药品" align="center"
              v-if="GYSCodecolumns.showColumn('inDeliveryId')" />
            <el-table-column prop="medicalAdviceId" label="医嘱id" align="center"
              v-if="GYSCodecolumns.showColumn('medicalAdviceId')" />
            <el-table-column prop="invoiceCode" label="发票号" align="center" :show-overflow-tooltip="true"
              v-if="GYSCodecolumns.showColumn('invoiceCode')" />
            <el-table-column prop="parentCode" label="父码" align="center" :show-overflow-tooltip="true"
              v-if="GYSCodecolumns.showColumn('parentCode')" />
            <el-table-column label="操作" width="160">
              <template #default="scope">
                <el-button type="primary" size="small" icon="view" title="详情"
                  @click="GYSCodehandlePreview(scope.row)"></el-button>
                <el-button type="success" size="small" icon="edit" title="编辑" v-hasPermi="['gyscodedetails:edit']"
                  @click="GYSCodehandleUpdate(scope.row)"></el-button>
                <el-button type="danger" size="small" icon="delete" title="删除" v-hasPermi="['gyscodedetails:delete']"
                  @click="GYSCodehandleDelete(scope.row)"></el-button>
              </template>
            </el-table-column>
          </el-table>
          <pagination :total="GYSCodetotal" v-model:page="GYSCodequeryParams.pageNum"
            v-model:limit="GYSCodequeryParams.pageSize" @pagination="GYSCodegetList" />


          <el-dialog :title="GYSCodetitle" :lock-scroll="false" v-model="GYSCodeopen">
            <el-form ref="GYSCodeformRef" :model="GYSCodeform" :GYSCoderules="GYSCoderules" label-width="100px">
              <el-row :gutter="20">

                <el-col :lg="12" v-if="GYSCodeopertype != 1">
                  <el-form-item label="Id" prop="id">
                    <el-input-number v-model.number="GYSCodeform.id" controls-position="right" placeholder="请输入Id"
                      :disabled="true" />
                  </el-form-item>
                </el-col>

                <el-col :lg="12">
                  <el-form-item label="送货单id" prop="deliveryid">
                    <el-input v-model.number="GYSCodeform.deliveryid" placeholder="请输入送货单id" />
                  </el-form-item>
                </el-col>

                <el-col :lg="12">
                  <el-form-item label="药品id" prop="drugId">
                    <el-input v-model.number="GYSCodeform.drugId" placeholder="请输入药品id" />
                  </el-form-item>
                </el-col>

                <el-col :lg="12">
                  <el-form-item label="追溯码" prop="code">
                    <el-input v-model="GYSCodeform.code" placeholder="请输入追溯码" />
                  </el-form-item>
                </el-col>

                <el-col :lg="12">
                  <el-form-item label="药品类型描述" prop="physicTypeDesc">
                    <el-input v-model="GYSCodeform.physicTypeDesc" placeholder="请输入药品类型描述" />
                  </el-form-item>
                </el-col>

                <el-col :lg="12">
                  <el-form-item label="企业id" prop="refEntId">
                    <el-input v-model="GYSCodeform.refEntId" placeholder="请输入企业id" />
                  </el-form-item>
                </el-col>

                <el-col :lg="12">
                  <el-form-item label="企业名称" prop="entName">
                    <el-input v-model="GYSCodeform.entName" placeholder="请输入企业名称" />
                  </el-form-item>
                </el-col>

                <el-col :lg="12">
                  <el-form-item label="码等级" prop="packageLevel">
                    <el-input v-model="GYSCodeform.packageLevel" placeholder="请输入码等级" />
                  </el-form-item>
                </el-col>

                <el-col :lg="12">
                  <el-form-item label="药品名称" prop="physicName">
                    <el-input v-model="GYSCodeform.physicName" placeholder="请输入药品名称" />
                  </el-form-item>
                </el-col>

                <el-col :lg="12">
                  <el-form-item label="有效期" prop="exprie">
                    <el-input v-model="GYSCodeform.exprie" placeholder="请输入有效期" />
                  </el-form-item>
                </el-col>

                <el-col :lg="12">
                  <el-form-item label="药品id" prop="drugEntBaseInfoId">
                    <el-input v-model="GYSCodeform.drugEntBaseInfoId" placeholder="请输入药品id" />
                  </el-form-item>
                </el-col>

                <el-col :lg="12">
                  <el-form-item label="批准文号" prop="approvalLicenceNo">
                    <el-input v-model="GYSCodeform.approvalLicenceNo" placeholder="请输入批准文号" />
                  </el-form-item>
                </el-col>

                <el-col :lg="12">
                  <el-form-item label="包装规格" prop="pkgSpecCrit">
                    <el-input v-model="GYSCodeform.pkgSpecCrit" placeholder="请输入包装规格" />
                  </el-form-item>
                </el-col>

                <el-col :lg="12">
                  <el-form-item label="制剂规格" prop="prepnSpec">
                    <el-input v-model="GYSCodeform.prepnSpec" placeholder="请输入制剂规格" />
                  </el-form-item>
                </el-col>

                <el-col :lg="12">
                  <el-form-item label="剂型描述" prop="prepnTypeDesc">
                    <el-input v-model="GYSCodeform.prepnTypeDesc" placeholder="请输入剂型描述" />
                  </el-form-item>
                </el-col>

                <el-col :lg="12">
                  <el-form-item label="生产日期" prop="produceDateStr">
                    <el-input v-model="GYSCodeform.produceDateStr" placeholder="请输入生产日期" />
                  </el-form-item>
                </el-col>

                <el-col :lg="12">
                  <el-form-item label="最小包装数量" prop="pkgAmount">
                    <el-input v-model="GYSCodeform.pkgAmount" placeholder="请输入最小包装数量" />
                  </el-form-item>
                </el-col>

                <el-col :lg="12">
                  <el-form-item label="有效期至" prop="expireDate">
                    <el-input v-model="GYSCodeform.expireDate" placeholder="请输入有效期至" />
                  </el-form-item>
                </el-col>

                <el-col :lg="12">
                  <el-form-item label="批次号" prop="batchNo">
                    <el-input v-model="GYSCodeform.batchNo" placeholder="请输入批次号" />
                  </el-form-item>
                </el-col>

                <el-col :lg="12">
                  <el-form-item label="扫码入库时间" prop="storageTime">
                    <el-input v-model="GYSCodeform.storageTime" placeholder="请输入扫码入库时间" />
                  </el-form-item>
                </el-col>

                <el-col :lg="12">
                  <el-form-item label="送货药品" prop="inDeliveryId">
                    <el-input v-model.number="GYSCodeform.inDeliveryId" placeholder="请输入送货药品" />
                  </el-form-item>
                </el-col>

                <el-col :lg="12">
                  <el-form-item label="医嘱id" prop="medicalAdviceId">
                    <el-input v-model.number="GYSCodeform.medicalAdviceId" placeholder="请输入医嘱id" />
                  </el-form-item>
                </el-col>

                <el-col :lg="12">
                  <el-form-item label="发票号" prop="invoiceCode">
                    <el-input v-model="GYSCodeform.invoiceCode" placeholder="请输入发票号" />
                  </el-form-item>
                </el-col>

                <el-col :lg="12">
                  <el-form-item label="父码" prop="parentCode">
                    <el-input v-model="GYSCodeform.parentCode" placeholder="请输入父码" />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <template #footer v-if="GYSCodeopertype != 3">
              <el-button text @click="GYSCodecancel">{{ $t('btn.cancel') }}</el-button>
              <el-button type="primary" @click="GYSCodesubmitForm">{{ $t('btn.submit') }}</el-button>
            </template>
          </el-dialog>
        </div>
      </div>
      <!-- 药品选择 -->
      <el-dialog :title="Drugtitle" :lock-scroll="false" v-model="Drugopen">
        <el-form :model="DrugqueryParams" label-position="right" inline ref="DrugqueryRef" v-show="DrugshowSearch"
          @submit.prevent>
          <el-form-item label="药品名称" prop="drugName">
            <el-input v-model="DrugqueryParams.drugName" placeholder="请输入药品名称" />
          </el-form-item>
          <el-form-item label="药品编号" prop="drugCode">
            <el-input v-model="DrugqueryParams.drugCode" placeholder="请输入药品编号" />
          </el-form-item>
          <el-form-item label="药品助记码" prop="drugMnemonicCode">
            <el-input v-model="DrugqueryParams.drugMnemonicCode" placeholder="请输入药品助记码" />
          </el-form-item>
          <el-form-item>
            <el-button icon="search" type="primary" @click="DrughandleQuery">{{ $t('btn.search') }}</el-button>
            <el-button icon="refresh" @click="DrugresetQuery">{{ $t('btn.reset') }}</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="DrugdataList" v-loading="Drugloading" ref="drugtable" border
          header-cell-class-name="el-table-header-cell" highlight-current-row @sort-change="DrugsortChange"
          v-model:selection="selectedItems" @selection-change="DrughandleSelectionChange">
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column prop="drugId" label="drugId" align="center" v-if="Drugcolumns.showColumn('drugId')" />
          <el-table-column prop="drugName" label="药品名称" align="center" :show-overflow-tooltip="true"
            v-if="Drugcolumns.showColumn('drugName')" />
          <el-table-column prop="drugCode" label="药品编号" align="center" :show-overflow-tooltip="true"
            v-if="Drugcolumns.showColumn('drugCode')" />
          <el-table-column prop="drugMnemonicCode" label="药品助记码" align="center" :show-overflow-tooltip="true"
            v-if="Drugcolumns.showColumn('drugMnemonicCode')" />
          <el-table-column prop="drugSpecifications" label="药品规格" align="center" :show-overflow-tooltip="true"
            v-if="Drugcolumns.showColumn('drugSpecifications')" />
          <el-table-column prop="drugCategory" label="药品类别" align="center" :show-overflow-tooltip="true"
            v-if="Drugcolumns.showColumn('drugCategory')" />
          <el-table-column prop="drugVarietyName" label="药品品种名称" align="center" :show-overflow-tooltip="true"
            v-if="Drugcolumns.showColumn('drugVarietyName')" />
          <el-table-column prop="drugClassification" label="药物分类" align="center" :show-overflow-tooltip="true"
            v-if="Drugcolumns.showColumn('drugClassification')" />
          <el-table-column prop="tracingSourceCode" label="溯源码" align="center" :show-overflow-tooltip="true"
            v-if="Drugcolumns.showColumn('tracingSourceCode')" />
          <el-table-column prop="drugBatchNumber" label="批号" align="center" :show-overflow-tooltip="true"
            v-if="Drugcolumns.showColumn('drugBatchNumber')" />
          <el-table-column prop="minunit" label="最小单位" align="center" :show-overflow-tooltip="true"
            v-if="Drugcolumns.showColumn('minunit')" />
          <el-table-column prop="produceName" label="生产厂家" align="center" :show-overflow-tooltip="true"
            v-if="Drugcolumns.showColumn('produceName')" />
          <el-table-column prop="packageRatio" label="转换系数" align="center"
            v-if="Drugcolumns.showColumn('packageRatio')" />
          <el-table-column prop="packageUnit" label="包装单位" align="center" :show-overflow-tooltip="true"
            v-if="Drugcolumns.showColumn('packageUnit')" />
          <el-table-column prop="price" label="价格" align="center" :show-overflow-tooltip="true"
            v-if="Drugcolumns.showColumn('price')" />
          <el-table-column prop="hisPrice" label="价格" align="center" :show-overflow-tooltip="true"
            v-if="Drugcolumns.showColumn('hisPrice')" />
        </el-table>
        <pagination :total="Drugtotal" v-model:page="DrugqueryParams.pageNum" v-model:limit="DrugqueryParams.pageSize"
          @pagination="DruggetList" />
        <template #footer v-if="Drugopertype != 3">
          <el-button text @click="Drugcancel">{{ $t('btn.cancel') }}</el-button>
          <el-button type="primary" @click="DrugsubmitForm">{{ $t('btn.submit') }}</el-button>
        </template>

      </el-dialog>

      <!-- 扫码入库 -->
      <el-dialog :title="FUllcodetitle" :lock-scroll="false" v-model="FUllcodeopen" width="90%">
        <div class="table-content">
          <div class="table-item1">
            <el-form ref="FUllcodeformRef" :model="FUllcodeform" :rules="FUllcoderules" label-width="100px">
              <el-row :gutter="20">
                <el-col :lg="12">
                  <el-form-item label="溯源码" prop="Code">
                    <el-input v-model="FUllcodeform.Code" placeholder="请输入溯源码" ref="refInput" @input="handleInput"
                      @blur="handleBlur" />
                  </el-form-item>
                </el-col>
                <el-col :lg="12">
                  <el-form-item label="入库时间" prop="storageTime">
                    <el-input v-model="FUllcodeform.storageTime" placeholder="请输入入库时间" />
                  </el-form-item>
                </el-col>
                <el-col :lg="12">
                  <el-form-item label="药品类型描述" prop="physicTypeDesc">
                    <el-input v-model="FUllcodeform.physicTypeDesc" placeholder="请输入药品类型描述" />
                  </el-form-item>
                </el-col>
                <el-col :lg="12">
                  <el-form-item label="企业id" prop="refEntId">
                    <el-input v-model="FUllcodeform.refEntId" placeholder="请输入企业id" />
                  </el-form-item>
                </el-col>
                <el-col :lg="12">
                  <el-form-item label="企业名称" prop="entName">
                    <el-input v-model="FUllcodeform.entName" placeholder="请输入企业名称" />
                  </el-form-item>
                </el-col>
                <el-col :lg="12">
                  <el-form-item label="码等级" prop="packageLevel">

                    <template v-slot="scope">
                      <el-input v-model="levelMap[FUllcodeform.packageLevel]" placeholder="请输入码等级" />
                      <!-- <span>{{ levelMap[scope.row.packageLevel] }}</span> -->
                    </template>
                  </el-form-item>
                </el-col>
                <el-col :lg="12">
                  <el-form-item label="药品名称" prop="physicName">
                    <el-input v-model="FUllcodeform.physicName" placeholder="请输入药品名称" />
                  </el-form-item>
                </el-col>
                <el-col :lg="12">
                  <el-form-item label="有效期" prop="exprie">
                    <el-input v-model="FUllcodeform.exprie" placeholder="请输入药品有效期" />
                  </el-form-item>
                </el-col>
                <el-col :lg="12">
                  <el-form-item label="药品ID" prop="drugEntBaseInfoId">
                    <el-input v-model="FUllcodeform.drugEntBaseInfoId" placeholder="请输入药品ID" />
                  </el-form-item>
                </el-col>
                <el-col :lg="12">
                  <el-form-item label="批准文号" prop="approvalLicenceNo">
                    <el-input v-model="FUllcodeform.approvalLicenceNo" placeholder="请输入批准文号" />
                  </el-form-item>
                </el-col>
                <el-col :lg="12">
                  <el-form-item label="包装规格" prop="pkgSpecCrit">
                    <el-input v-model="FUllcodeform.pkgSpecCrit" placeholder="请输入包装规格" />
                  </el-form-item>
                </el-col>
                <el-col :lg="12">
                  <el-form-item label="生产日期" prop="produceDateStr">
                    <el-input v-model="FUllcodeform.produceDateStr" placeholder="请输入生产日期" />
                  </el-form-item>
                </el-col>
                <el-col :lg="12">
                  <el-form-item label="制剂规格" prop="prepnSpec">
                    <el-input v-model="FUllcodeform.prepnSpec" placeholder="请输入制剂规格" />
                  </el-form-item>
                </el-col>
                <el-col :lg="12">
                  <el-form-item label="剂型描述" prop="prepnTypeDesc">
                    <el-input v-model="FUllcodeform.prepnTypeDesc" placeholder="请输入剂型描述" />
                  </el-form-item>
                </el-col>
                <el-col :lg="12">
                  <el-form-item label="最小包装数量" prop="pkgAmount">
                    <el-input v-model="FUllcodeform.pkgAmount" placeholder="请输入最小包装数量" />
                  </el-form-item>
                </el-col>
                <el-col :lg="12">
                  <el-form-item label="有效期至" prop="expireDate">
                    <el-input v-model="FUllcodeform.expireDate" placeholder="请输入有效期至" />
                  </el-form-item>
                </el-col>
                <el-col :lg="12">
                  <el-form-item label="批次号" prop="batchNo">
                    <el-input v-model="FUllcodeform.batchNo" placeholder="请输入批次号" />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <div class="table-item2">
            <el-table :data="AllMixCodelistM" ref="table" border header-cell-class-name="el-table-header-cell"
              highlight-current-row :row-class-name="rowClassName">
              <el-table-column prop="code" label="溯源码" align="center" v-if="AllMixCodecolumns.showColumn('code')" />
              <el-table-column prop="packageLevel" label="码等级" align="center" width="90" :show-overflow-tooltip="true"
                v-if="AllMixCodecolumns.showColumn('packageLevel')">
                <template v-slot="scope">
                  <span>{{ levelMap[scope.row.packageLevel] || '未知等级' }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="parentCode" label="父编码" align="center" :show-overflow-tooltip="true"
                v-if="AllMixCodecolumns.showColumn('parentCode')" />
              <el-table-column prop="parentCode" label="父码等级" align="center" :show-overflow-tooltip="true" width="90"
                v-if="AllMixCodecolumns.showColumn('codeLevel')">
                <template v-slot="scope">
                  <span>{{ levelMap[scope.row.codeLevel] }}</span>
                </template>
              </el-table-column>

            </el-table>
            <pagination :total="AllMixCodetotal" v-model:page="AllMixCodeParams.pageNum"
              v-model:limit="AllMixCodeParams.pageSize" @pagination="AllMixCodegetList" />
          </div>
        </div>

        <template #footer>
          <el-button text @click="FUllcodecancel">{{ $t('btn.cancel') }}</el-button>
          <el-button type="primary" @click="FUllcodesubmitForm">{{ $t('btn.submit') }}</el-button>
        </template>
      </el-dialog>
    </div>
  </div>

</template>
<style>
.table-content {
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.table-item1 {
  width: 70%;
  flex: 1;
}

.table-item2 {
  width: 30%;
  flex: 1;
}

.tb3 {
  margin-top: 42px;
}

/* 定义选中行的背景颜色 */
.selectedrow {
  /* background-color: #65c332 !important; */
  background-color: hsl(119, 67%, 70%) !important;
  /* 自定义的背景色 */
}

.inputs {
  background-color: hsl(119, 100%, 64%) !important;
  color: red;
  margin: 0px;
  padding: 0px;
}

.inputs .el-input__inner {
  /* background-color: hsl(119, 100%, 64%) !important; */
  color: red;
  margin: 0px;
  padding: 0px;
}
</style>
<script setup name="deliveryorder">
import {
  listDeliveryOrder,
  addDeliveryOrder, delDeliveryOrder,
  updateDeliveryOrder, getDeliveryOrder,
  clearDeliveryOrder, Tuisong
}
  from '@/api/business/deliveryorder.js'
import importData from '@/components/ImportData'
const { proxy } = getCurrentInstance()
const DeliveryOrderids = ref([])
const DeliveryOrderloading = ref(false)
const DeliveryOrdershowSearch = ref(true)
const DeliveryOrderqueryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  sort: 'Id',
  sortType: 'asc',
  billCode: undefined,
  invoiceNo: undefined,
  createTime: undefined,
  pushTime: undefined,
})
const DeliveryOrdercolumns = ref([
  { visible: false, align: 'center', type: '', prop: 'id', label: 'Id' },
  { visible: false, align: 'center', type: '', prop: 'stockId', label: '备货单id' },
  { visible: false, align: 'center', type: '', prop: 'drugId', label: '药品id' },
  { visible: true, align: 'center', type: '', prop: 'billCode', label: '单据号', showOverflowTooltip: true },
  { visible: true, align: 'center', type: '', prop: 'invoiceNo', label: '发票号', showOverflowTooltip: true },
  { visible: true, align: 'center', type: '', prop: 'deliveryDetails', label: '单据详情', showOverflowTooltip: true },
  { visible: true, align: 'center', type: '', prop: 'remarks', label: '备注', showOverflowTooltip: true },
  { visible: true, align: 'center', type: 'dict', prop: 'DeliveryOrderstates', label: '状态', showOverflowTooltip: true },
  { visible: false, align: 'center', type: '', prop: 'createTime', label: '创建时间', showOverflowTooltip: true },
  { visible: false, align: 'center', type: '', prop: 'pushTime', label: '推送时间', showOverflowTooltip: true },
  { visible: false, align: 'center', type: '', prop: 'createdBy', label: '创建人', showOverflowTooltip: true },

  //{ visible: false, prop: 'actions', label: '操作', type: 'slot', width: '160' }
])
const DeliveryOrdertotal = ref(0)
const DeliveryOrderdataList = ref([])
const DeliveryOrderqueryRef = ref()
const DeliveryOrderdefaultTime = ref([new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 2, 1, 23, 59, 59)])

// 创建时间时间范围
const DeliveryOrderdateRangeCreateTime = ref([])

// 推送时间时间范围
const DeliveryOrderdateRangePushTime = ref([])

import useUserStore from "@/store/modules/user";

// var userId = useUserStore().userId;
// console.log("userId: " + userId);
// console.log('userinfo', userInfo)
//{"userId":1,"userName":"admin","nickName":"管理员","userType":"0","avatar":"","email":"","phonenumber":"","sex":0,"status":0,"delFlag":0,"loginIP":"127.0.0.1","loginDate":"2023-07-25 16:58:43","deptId":0,"deptName":null,"roleIds":[1],"postIds":null,"roles":[{"roleId":1,"roleName":"超级管理员","roleKey":"admin","roleSort":1,"status":0,"delFlag":0,"dataScope":1,"menuCheckStrictly":true,"deptCheckStrictly":false,"menuIds":null,"deptIds":null,"userNum":0,"createBy":"admin","createTime":"2023-07-12 18:19:06","updateTime":null,"remark":"超级管理员"}],"welcomeMessage":"早上好","welcomeContent":"忙碌了一周，停一停脚步！","createBy":"","createTime":"2023-07-26 09:59:39","updateTime":null,"remark":"管理员"}
// 昵称



var dictParams = [
]


function DeliveryOrdergetList() {
  proxy.addDateRange(DeliveryOrderqueryParams, DeliveryOrderdateRangeCreateTime.value, 'CreateTime');
  proxy.addDateRange(DeliveryOrderqueryParams, DeliveryOrderdateRangePushTime.value, 'PushTime');
  DeliveryOrderloading.value = true
  listDeliveryOrder(DeliveryOrderqueryParams).then(res => {
    const { code, data } = res
    if (code == 200) {
      DeliveryOrderdataList.value = data.result
      DeliveryOrdertotal.value = data.totalNum
      DeliveryOrderloading.value = false
    }
  })
}

// 查询
function DeliveryOrderhandleQuery() {
  DeliveryOrderqueryParams.pageNum = 1
  DeliveryOrdergetList()
}

// 重置查询操作
function DeliveryOrderresetQuery() {
  // 创建时间时间范围
  DeliveryOrderdateRangeCreateTime.value = []
  // 推送时间时间范围
  DeliveryOrderdateRangePushTime.value = []
  proxy.resetForm("DeliveryOrderqueryRef")
  DeliveryOrderhandleQuery()
}
// 多选框选中数据
function DeliveryOrderhandleSelectionChange(selection) {
  DeliveryOrderids.value = selection.map((item) => item.id);
  DeliveryOrdersingle.value = selection.length != 1
  DeliveryOrdermultiple.value = !selection.length;

}

// 自定义排序
function DeliveryOrdersortChange(column) {
  var sort = undefined
  var sortType = undefined

  if (column.prop != null && column.order != null) {
    sort = column.prop
    sortType = column.order

  }
  DeliveryOrderqueryParams.sort = sort
  DeliveryOrderqueryParams.sortType = sortType
  DeliveryOrderhandleQuery()
}

/*************** form操作 ***************/
const DeliveryOrderformRef = ref()
const DeliveryOrdertitle = ref('')
// 操作类型 1、add 2、edit 3、view
const DeliveryOrderopertype = ref(0)
const DeliveryOrderopen = ref(false)
const DeliveryOrderstate = reactive({
  DeliveryOrdersingle: true,
  DeliveryOrdermultiple: true,
  DeliveryOrderform: {},
  DeliveryOrderrules: {
  },
  DeliveryOrderoptions: {
    // 状态 选项列表 格式 eg:{ dictLabel: '标签', dictValue: '0'}
    DeliveryOrderstatesOptions: [],
  }
})

const { DeliveryOrderform, DeliveryOrderrules, DeliveryOrderoptions, DeliveryOrdersingle, DeliveryOrdermultiple } = toRefs(DeliveryOrderstate)

// 关闭dialog
function DeliveryOrdercancel() {
  DeliveryOrderopen.value = false
  DeliveryOrderreset()
}

// 重置表单
function DeliveryOrderreset() {
  DeliveryOrderform.value = {
    id: null,
    stockId: null,
    drugId: null,
    billCode: null,
    invoiceNo: null,
    deliveryDetails: null,
    remarks: null,
    DeliveryOrderstates: null,
    createTime: null,
    pushTime: null,
    createdBy: null
  };
  proxy.resetForm("DeliveryOrderformRef")
}

/**
 * 查看
 * @param {*} row
 */
function DeliveryOrderhandlePreview(row) {
  DeliveryOrderreset()
  const id = row.id
  getDeliveryOrder(id).then((res) => {
    const { code, data } = res
    if (code == 200) {
      DeliveryOrderopen.value = true
      DeliveryOrdertitle.value = '查看'
      DeliveryOrderopertype.value = 3
      DeliveryOrderform.value = {
        ...data,
      }
    }
  })
}
var nickNames = useUserStore().name;

// 添加按钮操作
function DeliveryOrderhandleAdd() {
  DeliveryOrderreset();
  DeliveryOrderopen.value = true
  DeliveryOrdertitle.value = '添加送货单'
  DeliveryOrderopertype.value = 1
  DeliveryOrderform.value.createdBy = nickNames
}
// 修改按钮操作
function DeliveryOrderhandleUpdate(row) {
  DeliveryOrderreset()
  const id = row.id || DeliveryOrderids.value
  getDeliveryOrder(id).then((res) => {
    const { code, data } = res
    if (code == 200) {
      DeliveryOrderopen.value = true
      DeliveryOrdertitle.value = '修改送货单'
      DeliveryOrderopertype.value = 2
      DeliveryOrderform.value = {
        ...data,
      }
    }
  })
}

// 添加&修改 表单提交
function DeliveryOrdersubmitForm() {
  proxy.$refs["DeliveryOrderformRef"].validate((valid) => {
    if (valid) {

      if (DeliveryOrderform.value.id != undefined && DeliveryOrderopertype.value === 2) {
        updateDeliveryOrder(DeliveryOrderform.value).then((res) => {
          proxy.$modal.msgSuccess("修改成功")
          DeliveryOrderopen.value = false
          DeliveryOrdergetList()
        })
      } else {
        addDeliveryOrder(DeliveryOrderform.value).then((res) => {
          proxy.$modal.msgSuccess("新增成功")
          DeliveryOrderopen.value = false
          DeliveryOrdergetList()
        })
      }
    }
  })
}

// 删除按钮操作
function DeliveryOrderhandleDelete(row) {
  const Ids = row.id || DeliveryOrderids.value

  proxy
    .$confirm('是否确认删除参数编号为"' + Ids + '"的数据项？', "警告", {
      confirmButtonText: proxy.$t('common.ok'),
      cancelButtonText: proxy.$t('common.cancel'),
      type: "warning",
    })
    .then(function () {
      return delDeliveryOrder(Ids)
    })
    .then(() => {
      DeliveryOrdergetList()
      proxy.$modal.msgSuccess("删除成功")
    })
}

// 清空
function DeliveryOrderhandleClear() {
  proxy
    .$confirm("是否确认清空所有数据项?", "警告", {
      confirmButtonText: proxy.$t('common.ok'),
      cancelButtonText: proxy.$t('common.cancel'),
      type: "warning",
    })
    .then(function () {
      return clearDeliveryOrder()
    })
    .then(() => {
      DeliveryOrderhandleQuery()
      proxy.$modal.msgSuccess('清空成功')
    })
}

// 导入数据成功处理
const DeliveryOrderhandleFileSuccess = (response) => {
  const { item1, item2 } = response.data
  var error = ''
  item2.forEach((item) => {
    error += item.storageMessage + ','
  })
  proxy.$alert(item1 + '<p>' + error + '</p>', '导入结果', {
    dangerouslyUseHTMLString: true
  })
  DeliveryOrdergetList()
}

// 导出按钮操作
function DeliveryOrderhandleExport() {
  proxy
    .$confirm("是否确认导出送货单数据项?", "警告", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
    .then(async () => {
      await proxy.downFile('/business/DeliveryOrder/export', { ...DeliveryOrderqueryParams })
    })
}

DeliveryOrderhandleQuery()



import {
  listDeliveryOrderDrug,
  addDeliveryOrderDrug, delDeliveryOrderDrug,
  updateDeliveryOrderDrug, getDeliveryOrderDrug,
  clearDeliveryOrderDrug,
}
  from '@/api/business/deliveryorderdrug.js'
const DeliveryDrugids = ref([])
const DeliveryDrugloading = ref(false)
const DeliveryDrugshowSearch = ref(true)
const DeliveryDrugqueryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  sort: 'Id',
  sortType: 'asc',
  deliveryId: undefined,
  drugId: undefined,
  drugName: undefined,
  drugCode: undefined,
  drugBatchNo: undefined,
})
const DeliveryDrugcolumns = ref([
  { visible: false, align: 'center', type: '', prop: 'id', label: 'Id，自增主键' },
  { visible: true, align: 'center', type: '', prop: 'deliveryId', label: '送货单' },
  { visible: false, align: 'center', type: '', prop: 'drugId', label: '药品id' },
  { visible: true, align: 'center', type: '', prop: 'drugName', label: '药品名称', showOverflowTooltip: true },
  { visible: true, align: 'center', type: '', prop: 'drugCode', label: '药品编号', showOverflowTooltip: true },
  { visible: true, align: 'center', type: '', prop: 'drugSpecification', label: '药品规格', showOverflowTooltip: true },
  { visible: true, align: 'center', type: '', prop: 'drugBatchNo', label: '药品批号', showOverflowTooltip: true },
  { visible: true, align: 'center', type: '', prop: 'manufacturer', label: '生产厂家', showOverflowTooltip: true },
  { visible: true, align: 'center', type: '', prop: 'unitPrice', label: '单价' },
  { visible: true, align: 'center', type: '', prop: 'drugQuantity', label: '药品数量' },
  { visible: true, align: 'center', type: '', prop: 'minunit', label: '最小单位' },
  { visible: true, align: 'center', type: '', prop: 'exprie', label: '生产日期' },
  { visible: true, align: 'center', type: '', prop: 'dateOfManufacture', label: '有效期' },
  { visible: true, align: 'center', type: '', prop: 'packageRatio', label: '转换系数' },
  { visible: true, align: 'center', type: '', prop: 'packageUnit', label: '包装单位', showOverflowTooltip: true },
  { visible: false, align: 'center', type: '', prop: 'remarks', label: '备注', showOverflowTooltip: true },
  //{ visible: false, prop: 'actions', label: '操作', type: 'slot', width: '160' }
])
const DeliveryDrugtotal = ref(0)
const DeliveryDrugdataList = ref([])
const DeliveryDrugqueryRef = ref()


var dictParams = [
]


function DeliveryDruggetList() {
  DeliveryDrugloading.value = true
  listDeliveryOrderDrug(DeliveryDrugqueryParams).then(res => {
    const { code, data } = res
    if (code == 200) {
      console.log(res)
      DeliveryDrugdataList.value = data.result
      DeliveryDrugtotal.value = data.totalNum
      DeliveryDrugloading.value = false
    }
  })
}

// 查询
function DeliveryDrughandleQuery() {
  DeliveryDrugqueryParams.pageNum = 1
  DeliveryDruggetList()
}

// 重置查询操作
function DeliveryDrugresetQuery() {
  proxy.resetForm("DeliveryDrugqueryRef")
  DeliveryDrughandleQuery()
}
// 多选框选中数据
function DeliveryDrughandleSelectionChange(selection) {
  DeliveryDrugids.value = selection.map((item) => item.id);
  single.value = selection.length != 1
  multiple.value = !selection.length;
}
// 自定义排序
function DeliveryDrugsortChange(column) {
  var sort = undefined
  var sortType = undefined

  if (column.prop != null && column.order != null) {
    sort = column.prop
    sortType = column.order

  }
  DeliveryDrugqueryParams.sort = sort
  DeliveryDrugqueryParams.sortType = sortType
  DeliveryDrughandleQuery()
}

/*************** form操作 ***************/
const DeliveryDrugformRef = ref()
const DeliveryDrugtitle = ref('')
// 操作类型 1、add 2、edit 3、view
const DeliveryDrugopertype = ref(0)
const DeliveryDrugopen = ref(false)
const DeliveryDrugstate = reactive({
  DeliveryDrugsingle: true,
  DeliveryDrugmultiple: true,
  DeliveryDrugform: {},
  DeliveryDrugrules: {
  },
  DeliveryDrugoptions: {
  }
})

const { DeliveryDrugform, DeliveryDrugrules, DeliveryDrugoptions, single, multiple } = toRefs(DeliveryDrugstate)

// 关闭dialog
function DeliveryDrugcancel() {
  DeliveryDrugopen.value = false
  DeliveryDrugreset()
}

// 重置表单
function DeliveryDrugreset() {
  DeliveryDrugform.value = {
    id: null,
    deliveryId: null,
    drugId: null,
    drugName: null,
    drugCode: null,
    drugSpecification: null,
    drugBatchNo: null,
    manufacturer: null,
    unitPrice: null,
    drugQuantity: null,
    remarks: null,
  };
  proxy.resetForm("DeliveryDrugformRef")
}

/**
 * 查看
 * @param {*} row
 */
function DeliveryDrughandlePreview(row) {
  DeliveryDrugreset()
  const id = row.id
  getDeliveryOrderDrug(id).then((res) => {
    const { code, data } = res
    if (code == 200) {
      DeliveryDrugopen.value = true
      DeliveryDrugtitle.value = '查看'
      DeliveryDrugopertype.value = 3
      DeliveryDrugform.value = {
        ...data,
      }
    }
  })
}

// 添加按钮操作
function DeliveryDrughandleAdd() {
  DeliveryDrugreset();
  DeliveryDrugopen.value = true
  DeliveryDrugtitle.value = '添加送货单药品'
  DeliveryDrugopertype.value = 1
}
// 修改按钮操作
function DeliveryDrughandleUpdate(row) {
  DeliveryDrugreset()
  const id = row.id || DeliveryDrugids.value
  getDeliveryOrderDrug(id).then((res) => {
    const { code, data } = res
    if (code == 200) {
      DeliveryDrugopen.value = true
      DeliveryDrugtitle.value = '修改送货单药品'
      DeliveryDrugopertype.value = 2

      DeliveryDrugform.value = {
        ...data,
      }
    }
  })
}

// 添加&修改 表单提交
function DeliveryDrugsubmitForm() {
  proxy.$refs["DeliveryDrugformRef"].validate((valid) => {
    if (valid) {

      if (DeliveryDrugform.value.id != undefined && DeliveryDrugopertype.value === 2) {
        updateDeliveryOrderDrug(DeliveryDrugform.value).then((res) => {
          proxy.$modal.msgSuccess("修改成功")
          DeliveryDrugopen.value = false
          DeliveryDruggetList()
        })
      } else {
        addDeliveryOrderDrug(DeliveryDrugform.value).then((res) => {
          proxy.$modal.msgSuccess("新增成功")
          DeliveryDrugopen.value = false
          DeliveryDruggetList()
        })
      }
    }
  })
}

// 删除按钮操作
function DeliveryDrughandleDelete(row) {
  const Ids = row.id || DeliveryDrugids.value

  proxy
    .$confirm('是否确认删除参数编号为"' + Ids + '"的数据项？', "警告", {
      confirmButtonText: proxy.$t('common.ok'),
      cancelButtonText: proxy.$t('common.cancel'),
      type: "warning",
    })
    .then(function () {
      return delDeliveryOrderDrug(Ids)
    })
    .then(() => {
      DeliveryDruggetList()
      proxy.$modal.msgSuccess("删除成功")
    })
}

// 清空
function DeliveryDrughandleClear() {
  proxy
    .$confirm("是否确认清空所有数据项?", "警告", {
      confirmButtonText: proxy.$t('common.ok'),
      cancelButtonText: proxy.$t('common.cancel'),
      type: "warning",
    })
    .then(function () {
      return clearDeliveryOrderDrug()
    })
    .then(() => {
      DeliveryDrughandleQuery()
      proxy.$modal.msgSuccess('清空成功')
    })
}

// 导入数据成功处理
const DeliveryDrughandleFileSuccess = (response) => {
  const { item1, item2 } = response.data
  var error = ''
  item2.forEach((item) => {
    error += item.storageMessage + ','
  })
  proxy.$alert(item1 + '<p>' + error + '</p>', '导入结果', {
    dangerouslyUseHTMLString: true
  })
  DeliveryDruggetList()
}

// 导出按钮操作
function DeliveryDrughandleExport() {
  proxy
    .$confirm("是否确认导出送货单药品数据项?", "警告", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
    .then(async () => {
      await proxy.downFile('/business/DeliveryOrderDrug/export', { ...DeliveryDrugqueryParams })
    })
}

DeliveryDrughandleQuery()


import {
  listGYSCodeDetails,
  addGYSCodeDetails, delGYSCodeDetails,
  updateGYSCodeDetails, getGYSCodeDetails,
  clearGYSCodeDetails,
}
  from '@/api/business/gyscodedetails.js'
const GYSCodeids = ref([])
const GYSCodeloading = ref(false)
const GYSCodeshowSearch = ref(true)
const GYSCodequeryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  sort: '',
  sortType: 'asc',
  deliveryid: undefined,
  drugId: undefined,
  code: undefined,
  physicName: undefined,
  inDeliveryId: undefined,
  medicalAdviceId: undefined,
  invoiceCode: undefined,
  parentCode: undefined,
})
const GYSCodecolumns = ref([
  { visible: false, align: 'center', type: '', prop: 'id', label: 'Id' },
  { visible: false, align: 'center', type: '', prop: 'deliveryid', label: '送货单id' },
  { visible: false, align: 'center', type: '', prop: 'drugId', label: '药品id' },
  { visible: true, align: 'center', type: '', prop: 'code', label: '追溯码', showOverflowTooltip: true },
  { visible: true, align: 'center', type: '', prop: 'physicTypeDesc', label: '药品类型描述', showOverflowTooltip: true },
  { visible: true, align: 'center', type: '', prop: 'refEntId', label: '企业id', showOverflowTooltip: true },
  { visible: true, align: 'center', type: '', prop: 'entName', label: '企业名称', showOverflowTooltip: true },
  { visible: true, align: 'center', type: '', prop: 'packageLevel', label: '码等级', showOverflowTooltip: true },
  { visible: false, align: 'center', type: '', prop: 'physicName', label: '药品名称', showOverflowTooltip: true },
  { visible: false, align: 'center', type: '', prop: 'exprie', label: '有效期', showOverflowTooltip: true },
  { visible: false, align: 'center', type: '', prop: 'drugEntBaseInfoId', label: '药品id', showOverflowTooltip: true },
  { visible: false, align: 'center', type: '', prop: 'approvalLicenceNo', label: '批准文号', showOverflowTooltip: true },
  { visible: false, align: 'center', type: '', prop: 'pkgSpecCrit', label: '包装规格', showOverflowTooltip: true },
  { visible: false, align: 'center', type: '', prop: 'prepnSpec', label: '制剂规格', showOverflowTooltip: true },
  { visible: false, align: 'center', type: '', prop: 'prepnTypeDesc', label: '剂型描述', showOverflowTooltip: true },
  { visible: false, align: 'center', type: '', prop: 'produceDateStr', label: '生产日期', showOverflowTooltip: true },
  { visible: false, align: 'center', type: '', prop: 'pkgAmount', label: '最小包装数量', showOverflowTooltip: true },
  { visible: false, align: 'center', type: '', prop: 'expireDate', label: '有效期至', showOverflowTooltip: true },
  { visible: false, align: 'center', type: '', prop: 'batchNo', label: '批次号', showOverflowTooltip: true },
  { visible: false, align: 'center', type: '', prop: 'storageTime', label: '扫码入库时间', showOverflowTooltip: true },
  { visible: false, align: 'center', type: '', prop: 'inDeliveryId', label: '送货药品' },
  { visible: false, align: 'center', type: '', prop: 'medicalAdviceId', label: '医嘱id' },
  { visible: false, align: 'center', type: '', prop: 'invoiceCode', label: '发票号', showOverflowTooltip: true },
  { visible: false, align: 'center', type: '', prop: 'parentCode', label: '父码', showOverflowTooltip: true },
  //{ visible: false, prop: 'actions', label: '操作', type: 'slot', width: '160' }
])
const GYSCodetotal = ref(0)
const GYSCodedataList = ref([])
const GYSCodequeryRef = ref()


var dictParams = [
]


function GYSCodegetList() {
  GYSCodeloading.value = true
  listGYSCodeDetails(GYSCodequeryParams).then(res => {
    const { code, data } = res
    if (code == 200) {
      GYSCodedataList.value = data.result
      GYSCodetotal.value = data.totalNum
      GYSCodeloading.value = false
    }
  })
}

// 查询
function GYSCodehandleQuery() {
  GYSCodequeryParams.pageNum = 1
  GYSCodegetList()
}

// 重置查询操作
function GYSCoderesetQuery() {
  proxy.resetForm("GYSCodequeryRef")
  GYSCodehandleQuery()
}
// 多选框选中数据
function GYSCodehandleSelectionChange(selection) {
  GYSCodeids.value = selection.map((item) => item.id);
  GYSCodesingle.value = selection.length != 1
  GYSCodemultiple.value = !selection.length;
}
// 自定义排序
function GYSCodesortChange(column) {
  var sort = undefined
  var sortType = undefined

  if (column.prop != null && column.order != null) {
    sort = column.prop
    sortType = column.order

  }
  GYSCodequeryParams.sort = sort
  GYSCodequeryParams.sortType = sortType
  GYSCodehandleQuery()
}

/*************** form操作 ***************/
const GYSCodeformRef = ref()
const GYSCodetitle = ref('')
// 操作类型 1、add 2、edit 3、view
const GYSCodeopertype = ref(0)
const GYSCodeopen = ref(false)
const GYSCodestate = reactive({
  GYSCodesingle: true,
  GYSCodemultiple: true,
  GYSCodeform: {},
  GYSCoderules: {
  },
  GYSCodeoptions: {
  }
})

const { GYSCodeform, GYSCoderules, GYSCodeoptions, GYSCodesingle, GYSCodemultiple } = toRefs(GYSCodestate)

// 关闭dialog
function GYSCodecancel() {
  GYSCodeopen.value = false
  GYSCodereset()
}

// 重置表单
function GYSCodereset() {
  GYSCodeform.value = {
    id: null,
    deliveryid: null,
    drugId: null,
    code: null,
    physicTypeDesc: null,
    refEntId: null,
    entName: null,
    packageLevel: null,
    physicName: null,
    exprie: null,
    drugEntBaseInfoId: null,
    approvalLicenceNo: null,
    pkgSpecCrit: null,
    prepnSpec: null,
    prepnTypeDesc: null,
    produceDateStr: null,
    pkgAmount: null,
    expireDate: null,
    batchNo: null,
    storageTime: null,
    inDeliveryId: null,
    medicalAdviceId: null,
    invoiceCode: null,
    parentCode: null,
  };
  proxy.resetForm("GYSCodeformRef")
}

/**
 * 查看
 * @param {*} row
 */
function GYSCodehandlePreview(row) {
  GYSCodereset()
  const id = row.id
  getGYSCodeDetails(id).then((res) => {
    const { code, data } = res
    if (code == 200) {
      GYSCodeopen.value = true
      GYSCodetitle.value = '查看'
      GYSCodeopertype.value = 3
      GYSCodeform.value = {
        ...data,
      }
    }
  })
}

// 添加按钮操作
function GYSCodehandleAdd() {
  GYSCodereset();
  GYSCodeopen.value = true
  GYSCodetitle.value = '添加送货单追溯码'
  GYSCodeopertype.value = 1
}
// 修改按钮操作
function GYSCodehandleUpdate(row) {
  GYSCodereset()
  const id = row.id || GYSCodeids.value
  getGYSCodeDetails(id).then((res) => {
    const { code, data } = res
    if (code == 200) {
      GYSCodeopen.value = true
      GYSCodetitle.value = '修改送货单追溯码'
      GYSCodeopertype.value = 2

      GYSCodeform.value = {
        ...data,
      }
    }
  })
}

// 添加&修改 表单提交
function GYSCodesubmitForm() {
  proxy.$refs["GYSCodeformRef"].validate((valid) => {
    if (valid) {

      if (GYSCodeform.value.id != undefined && GYSCodeopertype.value === 2) {
        updateGYSCodeDetails(GYSCodeform.value).then((res) => {
          proxy.$modal.msgSuccess("修改成功")
          GYSCodeopen.value = false
          GYSCodegetList()
        })
      } else {
        addGYSCodeDetails(GYSCodeform.value).then((res) => {
          proxy.$modal.msgSuccess("新增成功")
          GYSCodeopen.value = false
          GYSCodegetList()
        })
      }
    }
  })
}

// 删除按钮操作
function GYSCodehandleDelete(row) {
  const Ids = row.id || GYSCodeids.value

  proxy
    .$confirm('是否确认删除参数编号为"' + Ids + '"的数据项？', "警告", {
      confirmButtonText: proxy.$t('common.ok'),
      cancelButtonText: proxy.$t('common.cancel'),
      type: "warning",
    })
    .then(function () {
      return delGYSCodeDetails(Ids)
    })
    .then(() => {
      GYSCodegetList()
      proxy.$modal.msgSuccess("删除成功")
    })
}

// 清空
function GYSCodehandleClear() {
  proxy
    .$confirm("是否确认清空所有数据项?", "警告", {
      confirmButtonText: proxy.$t('common.ok'),
      cancelButtonText: proxy.$t('common.cancel'),
      type: "warning",
    })
    .then(function () {
      return clearGYSCodeDetails()
    })
    .then(() => {
      GYSCodehandleQuery()
      proxy.$modal.msgSuccess('清空成功')
    })
}

// 导入数据成功处理
const GYSCodehandleFileSuccess = (response) => {
  const { item1, item2 } = response.data
  var error = ''
  item2.forEach((item) => {
    error += item.storageMessage + ','
  })
  proxy.$alert(item1 + '<p>' + error + '</p>', '导入结果', {
    dangerouslyUseHTMLString: true
  })
  GYSCodegetList()
}

// 导出按钮操作
function GYSCodehandleExport() {
  proxy
    .$confirm("是否确认导出送货单追溯码数据项?", "警告", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
    .then(async () => {
      await proxy.downFile('/business/GYSCodeDetails/export', { ...GYSCodequeryParams })
    })
}

GYSCodehandleQuery()


//药品选择

import {
  gyslistDrug,
  addDrug, delDrug,
  updateDrug, getDrug,
}
  from '@/api/business/drug.js'
import drag from '@/directive/module/drag';
// const { proxy } = getCurrentInstance()
const Drugids = ref([])
const Drugloading = ref(false)
const DrugshowSearch = ref(true)
const DrugqueryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  sort: '',
  sortType: 'asc',
  supplierName: undefined,
  drugName: undefined,
  drugCode: undefined,
  drugMnemonicCode: undefined,
})
var nickName = useUserStore().name;
DrugqueryParams.supplierName = nickName
const Drugcolumns = ref([
  { visible: false, align: 'center', type: '', prop: 'drugId', label: 'drugId' },
  { visible: true, align: 'center', type: '', prop: 'drugName', label: '药品名称', showOverflowTooltip: true },
  { visible: true, align: 'center', type: '', prop: 'drugCode', label: '药品编号', showOverflowTooltip: true },
  { visible: true, align: 'center', type: '', prop: 'drugMnemonicCode', label: '药品助记码', showOverflowTooltip: true },
  { visible: true, align: 'center', type: '', prop: 'drugSpecifications', label: '药品规格', showOverflowTooltip: true },
  { visible: true, align: 'center', type: '', prop: 'drugCategory', label: '药品类别', showOverflowTooltip: true },
  { visible: false, align: 'center', type: '', prop: 'drugVarietyName', label: '药品品种名称', showOverflowTooltip: true },
  { visible: true, align: 'center', type: '', prop: 'drugClassification', label: '药物分类', showOverflowTooltip: true },
  { visible: false, align: 'center', type: '', prop: 'tracingSourceCode', label: '溯源码', showOverflowTooltip: true },
  { visible: false, align: 'center', type: '', prop: 'drugBatchNumber', label: '批号', showOverflowTooltip: true },
  { visible: true, align: 'center', type: '', prop: 'minunit', label: '最小单位', showOverflowTooltip: true },
  { visible: true, align: 'center', type: '', prop: 'produceName', label: '生产厂家', showOverflowTooltip: true },
  { visible: true, align: 'center', type: '', prop: 'packageRatio', label: '转换系数' },
  { visible: true, align: 'center', type: '', prop: 'packageUnit', label: '包装单位', showOverflowTooltip: true },
  { visible: true, align: 'center', type: '', prop: 'price', label: '价格', showOverflowTooltip: true },
  { visible: true, align: 'center', type: '', prop: 'hisPrice', label: 'His价格', showOverflowTooltip: true },

  //{ visible: false, prop: 'actions', label: '操作', type: 'slot', width: '160' }
])
const Drugtotal = ref(0)
const DrugdataList = ref([])
const DrugqueryRef = ref()
const DrugdefaultTime = ref([new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 2, 1, 23, 59, 59)])


var DrugdictParams = [
]


function DruggetList() {
  Drugloading.value = true
  gyslistDrug(DrugqueryParams).then(res => {
    const { code, data } = res
    if (code == 200) {
      DrugdataList.value = data.result
      Drugtotal.value = data.totalNum
      Drugloading.value = false
    }
  })
}

// 查询
function DrughandleQuery() {
  DrugqueryParams.pageNum = 1
  DruggetList()
}

// 重置查询操作
function DrugresetQuery() {
  proxy.resetForm("DrugqueryRef")
  DrughandleQuery()
}
const selectedItems = ref([]);
// 获取表格实例的引用
const drugtable = ref(null);
// 标志变量
let alertShown = false;
// 多选框选中数据
function DrughandleSelectionChange(selection) {
  const duplicates = selection.filter(selectedItem => {
    return DeliveryDrugdataList.value.some(dataItem => dataItem.drugId === selectedItem.drugId);
  });

  if (duplicates.length > 0) {
    // 取消选中的重复行
    if (!alertShown) {
      alert(`选择的数据与现有数据重复！重复项数量: ${duplicates.length}`);
      alertShown = true; // 标记为已弹出
    }
    duplicates.forEach(item => {
      // 通过表格实例取消选中
      drugtable.value.toggleRowSelection(item, false);
    });

    // 更新选中项
    selectedItems.value = selection;
    return; // 如果有重复，不继续后续操作
  }
  alertShown = false;
  Drugids.value = selection.map((item) => item.drugId);
  Drugsingle.value = selection.length != 1
  Drugmultiple.value = !selection.length;
  FictitiousDrugData.value = selection.map((item, index) => {
    return {
      // ...item,         // 保留原始对象的其他属性
      Id: 0,
      DrugId: item.drugId,
      DeliveryId: DeliveryDrugqueryParams.deliveryId, // 添加 redid 属性，假设你要用索引值+1作为 redid
      DrugName: item.drugName,
      DrugCode: item.drugCode,
      DrugSpecification: item.drugSpecifications,
      DrugBatchNo: "",
      Manufacturer: item.produceName,
      UnitPrice: item.hisPrice,
      DrugQuantity: 0,
      Remarks: "",
      Minunit: item.minunit,
      PackageRatio: item.packageRatio,
      PackageUnit: item.packageUnit,
    };
  });
}




// 自定义排序
function DrugsortChange(column) {
  var sort = undefined
  var sortType = undefined

  if (Drugcolumn.prop != null && Drugcolumn.order != null) {
    sort = column.prop
    sortType = column.order

  }
  DrugqueryParams.sort = sort
  DrugqueryParams.sortType = sortType
  DrughandleQuery()
}

/*************** form操作 ***************/
const DrugformRef = ref()
const Drugtitle = ref('')
// 操作类型 1、add 2、edit 3、view
const Drugopertype = ref(0)
const Drugopen = ref(false)
const Drugstate = reactive({
  Drugsingle: true,
  Drugmultiple: true,
  Drugform: {},
  Drugrules: {
  },
  Drugoptions: {
  }
})

const { Drugform, Drugrules, Drugoptions, Drugsingle, Drugmultiple } = toRefs(Drugstate)
const FictitiousDrugData = ref([]);
// 关闭dialog
function Drugcancel() {
  Drugopen.value = false
  Drugreset()
}

// 重置表单
function Drugreset() {
  Drugform.value = {
    drugId: null,
    drugName: null,
    drugCode: null,
    drugMnemonicCode: null,
    drugSpecifications: null,
    drugCategory: null,
    drugVarietyName: null,
    drugClassification: null,
    tracingSourceCode: null,
    drugBatchNumber: null,
  };
  proxy.resetForm("DrugformRef")
}

/**
 * 查看
 * @param {*} row
 */
function DrughandlePreview(row) {
  // debugger

  Drugreset()
  const id = row.drugId
  getDrug(id).then((res) => {
    const { code, data } = res
    if (code == 200) {
      Drugopen.value = true
      Drugtitle.value = '查看'
      Drugopertype.value = 3
      Drugform.value = {
        ...data,
      }
    }
  })
}


// 添加按钮操作
function handleAdd() {
  Drugreset();
  Drugopen.value = true
  Drugtitle.value = '添加送货单药品'
  Drugopertype.value = 1
  DrugresetQuery()

}
// 字典映射
const levelMap = {
  1: '小码',
  2: '中码',
  3: '大码',
  11: '中码',
  21: '大码',
  31: '',

};
function DrugsubmitForm() {
  console.log("f", FictitiousDrugData)
  addDeliveryOrderDrug(FictitiousDrugData.value).then((res) => {
    proxy.$modal.msgSuccess("新增成功")
    Drugopen.value = false
    DeliveryDruggetList()
    DrugresetQuery()
  })
}
DrughandleQuery()



import { ref, nextTick } from 'vue';
const refInput = ref()
const FUllcodeformRef = ref()
const FUllcodetitle = ref('')
const FUllcodeopen = ref(false)

const FUllcode = reactive({
  FUllcodesingle: true,
  FUllcodemultiple: true,
  FUllcodeform: {

  },
  FUllcoderules: {
    // receiptId: [{ required: true, message: "入库单id不能为空", trigger: "blur", type: "number" }],
  },
  FUllcodeoptions: {
  }
})

const { FUllcodeform, FUllcoderules, FUllcodeoptions, FUllcodesingle, FUllcodemultiple } = toRefs(FUllcode)


function FUllcodecancel() {
  FUllcodeopen.value = false
  FullCodereset()
}// 重置表单
function FullCodereset() {
  FUllcodeform.value = {
    id: null,
    deliveryid: null,
    drugId: null,
    code: null,
    physicTypeDesc: null,
    refEntId: null,
    entName: null,
    packageLevel: null,
    physicName: null,
    exprie: null,
    drugEntBaseInfoId: null,
    approvalLicenceNo: null,
    pkgSpecCrit: null,
    prepnSpec: null,
    prepnTypeDesc: null,
    produceDateStr: null,
    pkgAmount: null,
    expireDate: null,
    batchNo: null,
    parentCode: null,
    inDeliveryId: null,
  };
  proxy.resetForm("CodeformRef")
}

const AllMixCodedataList = ref([])
const AllMixCodecolumns = ref([
  { visible: true, align: 'center', type: '', prop: 'code', label: '溯源码', showOverflowTooltip: true },
  { visible: true, align: 'center', type: '', prop: 'packageLevel', label: '码等级', showOverflowTooltip: true },
  { visible: true, align: 'center', type: '', prop: 'parentCode', label: '父编号', showOverflowTooltip: true },
  { visible: true, align: 'center', type: '', prop: 'codeLevel', label: '父编号', showOverflowTooltip: true },

])

const getAllMixCodedataList = async (code) => {
  try {
    // const response = await axios.get('http://120.79.135.98:8888/Mtaobo/AllMIXcode', {

    const response = await axios.get('http://119.145.169.162:50088/Mtaobo/AllMIXcode', {
      params: { codes: code }
    });
    console.log(`接口返回shuju${response.data.data}`)

    //console.log('接口返回数据3：', response);
    AllMixCodedataList.value = response.data.data
    AllMixCodegetList()
  } catch (error) {
    console.log(error)
  }
}
const AllMixCodelistM = ref([])

const AllMixCodetotal = ref(0)
const AllMixCodeParams = ref({
  pageNum: 1,
  pageSize: 10
})

function AllMixCodegetList() {
  AllMixCodetotal.value = AllMixCodedataList.value.length
  // AllMixCodedataList.value
  // const response =  api.getMixCodeList(AllMixCodeParams.value);
  // AllMixCodedataList.value = response.data; // 假设数据在response.data中
  // AllMixCodetotal.value = response.total; // 假设总数在response.total中
  const start = (AllMixCodeParams.value.pageNum - 1) * AllMixCodeParams.value.pageSize;
  const end = start + AllMixCodeParams.value.pageSize;
  AllMixCodelistM.value = AllMixCodedataList.value.slice(start, end);
}
const codelist = ref([])
const selectedcodeRow = ref(null);

// 添加&修改 表单提交
function FUllcodesubmitForm() {
  codelist.value = [];
  FUllcodeform.value.deliveryid = GYSCodequeryParams.deliveryid
  FUllcodeform.value.drugId = GYSCodequeryParams.drugId
  FUllcodeform.value.inDeliveryId = GYSCodequeryParams.inDeliveryId

  // FUllcodeform.value.code = AllMixCodedataList.value.code
  AllMixCodedataList.value.forEach(e => {
    FUllcodeform.value.Code = e.code;
    FUllcodeform.value.ParentCode = e.parentCode;
    FUllcodeform.value.packageLevel = e.packageLevel;
    const formCopy = { ...FUllcodeform.value };
    codelist.value.push(formCopy);
  });
  console.log("GYS", GYSCodequeryParams)
  console.log("full", FUllcodeform.value)
  console.log("CODES", codelist.value)
  proxy.$modal.loading("请稍等")
  addGYSCodeDetails(codelist.value).then((res) => {
    proxy.$modal.msgSuccess("新增成功")
    proxy.$modal.closeLoading()
    // GYSCodeopen.value = false
    FUllcodeopen.value = false
    // selectedcodeRow.value.batchNumber = FUllcodeform.value.batchNo
    // selectedcodeRow.value.exprie = formattedDate(FUllcodeform.value.expireDate)
    // selectedcodeRow.value.dateOfManufacture = FUllcodeform.value.produceDateStr

    // if (selectedcodeRow.value.id != undefined) {
    //   // updateInWarehousing(selectedcodeRow.value).then((res) => {
    //   //   getList()
    //   // })
    // }
    GYSCodegetList()

  })

}
const formattedDate = (date) => {
  date = date.toString();
  return `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)}`;
};
let typingTimeout = null;
import axios from 'axios';
import UserInfo from '../system/user/profile/userInfo.vue';
// 处理用户输入
const handleInput = () => {
  console.log('正在输入:', FUllcodeform.value.Code);

  // 清除之前的定时器
  if (typingTimeout) {
    clearTimeout(typingTimeout);
  }

  // 设置新的定时器，在用户输入停止后延迟处理
  typingTimeout = setTimeout(() => {
    console.log('输入结束值：', FUllcodeform.value.Code);
    //调用本地方法
    fetchData(FUllcodeform.value.Code)
    getAllMixCodedataList(FUllcodeform.value.Code)
    console.log('接口返回数据2：', AllMixCodedataList.value);

  }, 200); // 延迟时间（300ms），可以根据需要调整
};

// 处理失去焦点
const handleBlur = () => {
  // 清除定时器，确保在失去焦点时处理最终值
  if (typingTimeout) {
    clearTimeout(typingTimeout);
    console.log('输入结束值（失去焦点）：', FUllcodeform.value.Code);
  }
};

// 定义 fetchData 函数
const fetchData = async (code) => {
  try {
    const response = await axios.get('http://119.145.169.162:50088/Mtaobo/codedetail', {
      params: { codes: code }
    });
    console.log('接口返回数据：', response.data.data.models[0]);

    // FUllcodeform = response.data
    FUllcodeform.Code = response.data.data.models[0].code
    // console.log(response.data.models[0].drugEntBaseDTO.approvalLicenceNo)
    FUllcodeform.value.codeStatus = response.data.data.models[0].codeStatusTypeDTO.codeStatus
    FUllcodeform.value.approvalLicenceNo = response.data.data.models[0].drugEntBaseDTO.approvalLicenceNo
    FUllcodeform.value.exprie = response.data.data.models[0].drugEntBaseDTO.exprie

    FUllcodeform.value.drugEntBaseInfoId = response.data.data.models[0].drugEntBaseDTO.drugEntBaseInfoId
    FUllcodeform.value.physicName = response.data.data.models[0].drugEntBaseDTO.physicName
    FUllcodeform.value.physicTypeDesc = response.data.data.models[0].drugEntBaseDTO.physicTypeDesc
    FUllcodeform.value.pkgSpecCrit = response.data.data.models[0].drugEntBaseDTO.pkgSpecCrit
    FUllcodeform.value.prepnSpec = response.data.data.models[0].drugEntBaseDTO.prepnSpec
    FUllcodeform.value.prepnTypeDesc = response.data.data.models[0].drugEntBaseDTO.prepnTypeDesc
    FUllcodeform.value.entName = response.data.data.models[0].pUserEntDTO.entName
    FUllcodeform.value.refEntId = response.data.data.models[0].pUserEntDTO.refEntId
    FUllcodeform.value.packageLevel = response.data.data.models[0].packageLevel

    FUllcodeform.value.pkgAmount = response.data.data.models[0].codeProduceInfoDTO.produceInfoList[0].pkgAmount
    FUllcodeform.value.expireDate = formattedDate(response.data.data.models[0].codeProduceInfoDTO.produceInfoList[0].expireDate)
    FUllcodeform.value.batchNo = response.data.data.models[0].codeProduceInfoDTO.produceInfoList[0].batchNo
    FUllcodeform.value.produceDateStr = response.data.data.models[0].codeProduceInfoDTO.produceInfoList[0].produceDateStr

    FUllcodeform.value.storageTime = new Date().toLocaleString()

  } catch (error) {
    console.error('请求失败：', error);
  }


};

//双击更新数据
function CODEDrugdatalist(row) {
  selectedcodeRow.value = row;

  console.log("row", row)

  GYSCodequeryParams.deliveryid = DeliveryDrugqueryParams.deliveryId
  GYSCodequeryParams.drugId = row.drugId
  GYSCodequeryParams.inDeliveryId = row.id

  GYSCodegetList()

}
function CodeScreenAdd(row) {
  GYSCodereset()

  FUllcodeopen.value = true
  FUllcodetitle.value = '扫码添加'
  GYSCodequeryParams.deliveryid = DeliveryDrugqueryParams.DeliveryId
  GYSCodequeryParams.drugId = row.drugId
  GYSCodequeryParams.inDeliveryId = row.id
  console.log("GYSCodequeryParams", GYSCodequeryParams)

  // FUllcodeopertype.value = 1
  // alert(row.id)
  setTimeout(() => {
    refInput.value.focus()
  }, 100
  )
}

// 当前选中的行
const selectedRow = ref(null);
//更新数据
function DeliveryOrderDrugdatalist(row) {
  selectedRow.value = row;
  DeliveryDrugqueryParams.deliveryId = row.id
  console.log("f", DeliveryDrugqueryParams.deliveryId)

  DeliveryDruggetList()
  // if (CodequeryParams.drugId != 0 || CodequeryParams.receiptid != 0) {
  //   CodequeryParams.receiptid = 0
  //   CodequeryParams.drugId = 0
  //   CodegetList()
  // }
}

function DrugQuantityChange() {

}



function tuisong() {
  Tuisong(DeliveryOrderids.value).then((result) => {
    proxy.$modal.msgSuccess("推送成功")

  })
}
</script>