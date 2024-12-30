<!--
 * @Descripttion: (合同/SupplyContract)
 * @Author: (admin)
 * @Date: (2024-12-05)
-->
<template>
  <div>
    <div class="table-content">
      <div class="table-item1">
        <el-form :model="SupplierqueryParams" label-position="right" inline ref="SupplierqueryRef"
          v-show="SuppliershowSearch" @submit.prevent>
          <!-- <el-form-item label="id" prop="id">
            <el-input v-model.number="SupplierqueryParams.id" placeholder="请输入id" />
          </el-form-item> -->
          <el-form-item label="供应商名称" prop="supplierName">
            <el-input v-model="SupplierqueryParams.supplierName" placeholder="请输入供应商名称" />
          </el-form-item>
          <!-- <el-form-item label="社会信用代码" prop="socialCreditCode">
            <el-input v-model="SupplierqueryParams.socialCreditCode" placeholder="请输入社会信用代码" />
          </el-form-item>
          <el-form-item label="企业地址" prop="enterpriseAddress">
            <el-input v-model="SupplierqueryParams.enterpriseAddress" placeholder="请输入企业地址" />
          </el-form-item>
          <el-form-item label="企业电话" prop="enterprisePhone">
            <el-input v-model="SupplierqueryParams.enterprisePhone" placeholder="请输入企业电话" />
          </el-form-item> -->
          <el-form-item>
            <el-button icon="search" type="primary" @click="SupplierhandleQuery">{{ $t('btn.search') }}</el-button>
            <el-button icon="refresh" @click="SupplierresetQuery">{{ $t('btn.reset') }}</el-button>
          </el-form-item>
        </el-form>
        <!-- 工具区域 -->
        <!-- <el-row :gutter="15" class="mb10">
      <el-col :span="1.5">
        <el-button type="primary" v-hasPermi="['supplier:add']" plain icon="plus" @click="SupplierhandleAdd">
          {{ $t('btn.add') }}
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" :disabled="Suppliersingle" v-hasPermi="['supplier:edit']" plain icon="edit"
          @click="SupplierhandleUpdate">
          {{ $t('btn.edit') }}
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" :disabled="Suppliermultiple" v-hasPermi="['supplier:delete']" plain icon="delete"
          @click="SupplierhandleDelete">
          {{ $t('btn.delete') }}
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" v-hasPermi="['supplier:delete']" plain icon="delete" @click="SupplierhandleClear">
          {{ $t('btn.clean') }}
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-dropdown trigger="click" v-hasPermi="['supplier:import']">
          <el-button type="primary" plain icon="Upload">
            {{ $t('btn.import') }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="upload">
                <importData templateUrl="business/Supplier/importTemplate" importUrl="/business/Supplier/importData"
                  @success="SupplierhandleFileSuccess"></importData>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
</el-dropdown>
</el-col>
<el-col :span="1.5">
  <el-button type="warning" plain icon="download" @click="SupplierhandleExport" v-hasPermi="['supplier:export']">
    {{ $t('btn.export') }}
  </el-button>
</el-col>
<right-toolbar v-model:showSearch="SuppliershowSearch" @queryTable="SuppliergetList"
  :columns="Suppliercolumns"></right-toolbar>
</el-row> -->

        <el-table @row-click="gysclick" :data="SupplierdataList" v-loading="Supplierloading" ref="Suppliertable" border
          header-cell-class-name="el-table-header-cell" highlight-current-row @sort-change="SuppliersortChange"
          @selection-change="SupplierhandleSelectionChange">
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column prop="id" label="id" align="center" v-if="Suppliercolumns.showColumn('id')" />
          <el-table-column prop="supplierName" label="供应商名称" align="center" :show-overflow-tooltip="true"
            v-if="Suppliercolumns.showColumn('supplierName')" />
          <el-table-column prop="socialCreditCode" label="社会信用代码" align="center" :show-overflow-tooltip="true"
            v-if="Suppliercolumns.showColumn('socialCreditCode')" />
          <el-table-column prop="enterpriseAddress" label="企业地址" align="center" :show-overflow-tooltip="true"
            v-if="Suppliercolumns.showColumn('enterpriseAddress')" />
          <el-table-column prop="enterprisePhone" label="企业电话" align="center" :show-overflow-tooltip="true"
            v-if="Suppliercolumns.showColumn('enterprisePhone')" />
          <!-- <el-table-column label="操作" width="160">
        <template #default="scope">
          <el-button type="primary" size="small" icon="view" title="详情"
            @click="SupplierhandlePreview(scope.row)"></el-button>
          <el-button type="success" size="small" icon="edit" title="编辑" v-hasPermi="['supplier:edit']"
            @click="SupplierhandleUpdate(scope.row)"></el-button>
          <el-button type="danger" size="small" icon="delete" title="删除" v-hasPermi="['supplier:delete']"
            @click="SupplierhandleDelete(scope.row)"></el-button>
        </template> -->
          <!-- </el-table-column> -->
        </el-table>
        <pagination :total="Suppliertotal" v-model:page="SupplierqueryParams.pageNum"
          v-model:limit="SupplierqueryParams.pageSize" @pagination="SuppliergetList" />
        <el-dialog :title="Suppliertitle" :lock-scroll="false" v-model="Supplieropen">
          <el-form ref="SupplierformRef" :model="Supplierform" :rules="Supplierrules" label-width="100px">
            <el-row :gutter="20">

              <el-col :lg="12">
                <el-form-item label="id" prop="id">
                  <el-input v-model.number="Supplierform.id" placeholder="请输入id" :disabled="Supplieropertype != 1" />
                </el-form-item>
              </el-col>

              <el-col :lg="12">
                <el-form-item label="供应商名称" prop="supplierName">
                  <el-input v-model="Supplierform.supplierName" placeholder="请输入供应商名称" />
                </el-form-item>
              </el-col>

              <el-col :lg="12">
                <el-form-item label="社会信用代码" prop="socialCreditCode">
                  <el-input v-model="Supplierform.socialCreditCode" placeholder="请输入社会信用代码" />
                </el-form-item>
              </el-col>

              <el-col :lg="12">
                <el-form-item label="企业地址" prop="enterpriseAddress">
                  <el-input v-model="Supplierform.enterpriseAddress" placeholder="请输入企业地址" />
                </el-form-item>
              </el-col>

              <el-col :lg="12">
                <el-form-item label="企业电话" prop="enterprisePhone">
                  <el-input v-model="Supplierform.enterprisePhone" placeholder="请输入企业电话" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <template #footer v-if="Supplieropertype != 3">
            <el-button text @click="Suppliercancel">{{ $t('btn.cancel') }}</el-button>
            <el-button type="primary" @click="SuppliersubmitForm">{{ $t('btn.submit') }}</el-button>
          </template>
        </el-dialog>
      </div>
      <div class="table-item2">
        <el-form :model="ContractqueryParams" label-position="right" inline ref="ContractqueryRef"
          v-show="ContractshowSearch" @submit.prevent>
          <el-form-item label="合同编号" prop="contractCode">
            <el-input v-model="ContractqueryParams.contractCode" placeholder="请输入合同编号" />
          </el-form-item>
          <el-form-item label="合同名称" prop="contractName">
            <el-input v-model="ContractqueryParams.contractName" placeholder="请输入合同名称" />
          </el-form-item>
          <!-- <el-form-item label="合同供应商名称" prop="supplierName">
            <el-input v-model="ContractqueryParams.supplierName" placeholder="请输入合同供应商名称" />
          </el-form-item> -->
          <el-form-item>
            <el-button icon="search" type="primary" @click="ContracthandleQuery">{{ $t('btn.search') }}</el-button>
            <el-button icon="refresh" @click="ContractresetQuery">{{ $t('btn.reset') }}</el-button>
          </el-form-item>
        </el-form>
        <!-- 工具区域 -->
        <el-row :gutter="15" class="mb10">
          <el-col :span="1.5">
            <el-button type="primary" v-hasPermi="['supplycontract:add']" plain icon="plus" @click="ContracthandleAdd">
              {{ $t('btn.add') }}
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" :disabled="Contractsingle" v-hasPermi="['supplycontract:edit']" plain icon="edit"
              @click="ContracthandleUpdate">
              {{ $t('btn.edit') }}
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" :disabled="Contractmultiple" v-hasPermi="['supplycontract:delete']" plain
              icon="delete" @click="ContracthandleDelete">
              {{ $t('btn.delete') }}
            </el-button>
          </el-col>
          <!-- <el-col :span="1.5">
            <el-button type="danger" v-hasPermi="['supplycontract:delete']" plain icon="delete"
              @click="ContracthandleClear">
              {{ $t('btn.clean') }}
            </el-button>
          </el-col> -->
          <el-col :span="1.5">
            <el-dropdown trigger="click" v-hasPermi="['supplycontract:import']">
              <el-button type="primary" plain icon="Upload">
                {{ $t('btn.import') }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="upload">
                    <importData templateUrl="business/SupplyContract/importTemplate"
                      importUrl="/business/SupplyContract/importData" @success="ContracthandleFileSuccess"></importData>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="download" @click="ContracthandleExport"
              v-hasPermi="['supplycontract:export']">
              {{ $t('btn.export') }}
            </el-button>
          </el-col>
          <right-toolbar v-model:showSearch="ContractshowSearch" @queryTable="ContractgetList"
            :columns="Contractcolumns"></right-toolbar>
        </el-row>

        <el-table @row-click="drugsclick" :data="ContractdataList" v-loading="Contractloading" ref="Contracttable"
          border header-cell-class-name="el-table-header-cell" highlight-current-row @sort-change="ContractsortChange"
          @selection-change="ContracthandleSelectionChange">
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column prop="id" label="合同的唯一标识符" align="center" v-if="Contractcolumns.showColumn('id')" />
          <el-table-column prop="contractCode" label="合同编号" align="center" :show-overflow-tooltip="true"
            v-if="Contractcolumns.showColumn('contractCode')" />
          <el-table-column prop="contractName" label="合同名称" align="center" :show-overflow-tooltip="true"
            v-if="Contractcolumns.showColumn('contractName')" />
          <el-table-column prop="startDate" label="合同开始日期" :show-overflow-tooltip="true"
            v-if="Contractcolumns.showColumn('startDate')" />
          <el-table-column prop="endDate" label="合同结束日期" :show-overflow-tooltip="true"
            v-if="Contractcolumns.showColumn('endDate')" />
          <el-table-column prop="contractType" label="合同类型" align="center"
            v-if="Contractcolumns.showColumn('contractType')">
            <!-- <template #default="scope">
              <dict-tag :options="Contractoptions.contractTypeOptions" :value="scope.row.contractType" />
            </template> -->
          </el-table-column>
          <el-table-column prop="supplierName" label="合同供应商名称" align="center" :show-overflow-tooltip="true"
            v-if="Contractcolumns.showColumn('supplierName')" />
          <el-table-column prop="states" label="合同状态" align="center" v-if="Contractcolumns.showColumn('states')">
            <!-- <template #default="scope">
              <dict-tag :options="Contractoptions.statesOptions" :value="scope.row.states" />
            </template> -->
          </el-table-column>
          <el-table-column prop="createdAt" label="创建时间" :show-overflow-tooltip="true"
            v-if="Contractcolumns.showColumn('createdAt')" />
          <el-table-column prop="createdBy" label="创建人" align="center" :show-overflow-tooltip="true"
            v-if="Contractcolumns.showColumn('createdBy')" />
          <el-table-column prop="modifiedAt" label="修改时间" :show-overflow-tooltip="true"
            v-if="Contractcolumns.showColumn('modifiedAt')" />
          <el-table-column prop="modifiedBy" label="修改人" align="center" :show-overflow-tooltip="true"
            v-if="Contractcolumns.showColumn('modifiedBy')" />
          <el-table-column label="操作" width="160">
            <template #default="scope">
              <el-button type="primary" size="small" icon="view" Contracttitle="详情"
                @click="ContracthandlePreview(scope.row)"></el-button>
              <el-button type="success" size="small" icon="edit" Contracttitle="编辑" v-hasPermi="['supplycontract:edit']"
                @click="ContracthandleUpdate(scope.row)"></el-button>
              <el-button type="danger" size="small" icon="delete" Contracttitle="删除"
                v-hasPermi="['supplycontract:delete']" @click="ContracthandleDelete(scope.row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination :total="Contracttotal" v-model:page="ContractqueryParams.pageNum"
          v-model:limit="ContractqueryParams.pageSize" @pagination="ContractgetList" />


        <el-dialog :Contracttitle="Contracttitle" :lock-scroll="false" v-model="Contractopen">
          <el-form ref="ContractformRef" :model="Contractform" :Contractrules="Contractrules" label-width="100px">
            <el-row :gutter="20">

              <el-col :lg="12" v-if="Contractopertype != 1">
                <el-form-item label="合同的唯一标识符" prop="id">
                  <el-input-number v-model.number="Contractform.id" controls-position="right" placeholder="请输入合同的唯一标识符"
                    :disabled="true" />
                </el-form-item>
              </el-col>

              <el-col :lg="12">
                <el-form-item label="合同编号" prop="contractCode">
                  <el-input v-model="Contractform.contractCode" placeholder="请输入合同编号" />
                </el-form-item>
              </el-col>

              <el-col :lg="12">
                <el-form-item label="合同名称" prop="contractName">
                  <el-input v-model="Contractform.contractName" placeholder="请输入合同名称" />
                </el-form-item>
              </el-col>

              <el-col :lg="12">
                <el-form-item label="合同开始日期" prop="startDate">
                  <el-date-picker v-model="Contractform.startDate" type="datetime" placeholder="选择日期时间"
                    value-format="YYYY-MM-DD HH:mm:ss">
                  </el-date-picker>
                </el-form-item>
              </el-col>

              <el-col :lg="12">
                <el-form-item label="合同结束日期" prop="endDate">
                  <el-date-picker v-model="Contractform.endDate" type="datetime" placeholder="选择日期时间"
                    value-format="YYYY-MM-DD HH:mm:ss">
                  </el-date-picker>
                </el-form-item>
              </el-col>

              <el-col :lg="12">
                <el-form-item label="合同类型" prop="contractType">
                  <el-select v-model="Contractform.contractType" placeholder="请选择合同类型">
                    <el-option v-for="item in Contractoptions.contractTypeOptions" :key="item.dictValue"
                      :label="item.dictLabel" :value="item.dictValue"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :lg="12">
                <el-form-item label="合同供应商名称" prop="supplierName">
                  <el-input v-model="Contractform.supplierName" placeholder="请输入合同供应商名称" />
                </el-form-item>
              </el-col>

              <el-col :lg="12">
                <el-form-item label="合同状态" prop="states">
                  <el-radio-group v-model="Contractform.states">
                    <el-radio v-for="item in Contractoptions.statesOptions" :key="item.dictValue"
                      :value="item.dictValue">
                      {{ item.dictLabel }}
                    </el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>

              <el-col :lg="12">
                <el-form-item label="创建时间" prop="createdAt">
                  <el-date-picker v-model="Contractform.createdAt" type="datetime" placeholder="选择日期时间"
                    value-format="YYYY-MM-DD HH:mm:ss">
                  </el-date-picker>
                </el-form-item>
              </el-col>

              <el-col :lg="12">
                <el-form-item label="创建人" prop="createdBy">
                  <el-input v-model="Contractform.createdBy" placeholder="请输入创建人" />
                </el-form-item>
              </el-col>

              <el-col :lg="12">
                <el-form-item label="修改时间" prop="modifiedAt">
                  <el-date-picker v-model="Contractform.modifiedAt" type="datetime" placeholder="选择日期时间"
                    value-format="YYYY-MM-DD HH:mm:ss">
                  </el-date-picker>
                </el-form-item>
              </el-col>

              <el-col :lg="12">
                <el-form-item label="修改人" prop="modifiedBy">
                  <el-input v-model="Contractform.modifiedBy" placeholder="请输入修改人" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <template #footer v-if="Contractopertype != 3">
            <el-button text @click="Contractcancel">{{ $t('btn.cancel') }}</el-button>
            <el-button type="primary" @click="ContractsubmitForm">{{ $t('btn.submit') }}</el-button>
          </template>
        </el-dialog>
      </div>
    </div>

    <div>
      <el-form :model="ContractDrugqueryParams" label-position="right" inline ref="ContractDrugqueryRef"
        v-show="ContractDrugshowSearch" @submit.prevent>
        <el-form-item label="合同编号" prop="contractCode">
          <el-input v-model="ContractDrugqueryParams.contractCode" placeholder="请输入合同编号" />
        </el-form-item>
        <el-form-item label="药品编码" prop="drugCode">
          <el-input v-model="ContractDrugqueryParams.drugCode" placeholder="请输入药品编码" />
        </el-form-item>
        <el-form-item>
          <el-button icon="search" type="primary" @click="ContractDrughandleQuery">{{ $t('btn.search') }}</el-button>
          <el-button icon="refresh" @click="ContractDrugresetQuery">{{ $t('btn.reset') }}</el-button>
        </el-form-item>
      </el-form>
      <!-- 工具区域 -->
      <el-row :gutter="15" class="mb10">
        <el-col :span="1.5">
          <el-button type="primary" v-hasPermi="['supplycontractdrug:add']" plain icon="plus"
            @click="ContractDrughandleAdd">
            {{ $t('btn.add') }}
          </el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button type="success" :disabled="ContractDrugsingle" v-hasPermi="['supplycontractdrug:edit']" plain
            icon="edit" @click="ContractDrughandleUpdate">
            {{ $t('btn.edit') }}
          </el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button type="danger" :disabled="ContractDrugmultiple" v-hasPermi="['supplycontractdrug:delete']" plain
            icon="delete" @click="ContractDrughandleDelete">
            {{ $t('btn.delete') }}
          </el-button>
        </el-col>
        <!-- <el-col :span="1.5">
          <el-button type="danger" v-hasPermi="['supplycontractdrug:delete']" plain icon="delete"
            @click="ContractDrughandleClear">
            {{ $t('btn.clean') }}
          </el-button>
        </el-col> -->
        <el-col :span="1.5">
          <el-dropdown trigger="click" v-hasPermi="['supplycontractdrug:import']">
            <el-button type="primary" plain icon="Upload">
              {{ $t('btn.import') }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="upload">
                  <importData templateUrl="business/SupplyContractDrug/importTemplate"
                    importUrl="/business/SupplyContractDrug/importData" @success="ContractDrughandleFileSuccess">
                  </importData>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-col>
        <el-col :span="1.5">
          <el-button type="warning" plain icon="download" @click="ContractDrughandleExport"
            v-hasPermi="['supplycontractdrug:export']">
            {{ $t('btn.export') }}
          </el-button>
        </el-col>
        <right-toolbar v-model:showSearch="ContractDrugshowSearch" @queryTable="ContractDruggetList"
          :columns="ContractDrugcolumns"></right-toolbar>
      </el-row>

      <el-table :data="ContractDrugdataList" v-loading="ContractDrugloading" ref="ContractDrugtable" border
        header-cell-class-name="el-table-header-cell" highlight-current-row @sort-change="ContractDrugsortChange"
        @selection-change="ContractDrughandleSelectionChange">
        <el-table-column type="selection" width="50" align="center" />
        <el-table-column prop="id" label="id" align="center" v-if="ContractDrugcolumns.showColumn('id')" />
        <el-table-column prop="contractCode" label="合同编号" align="center" :show-overflow-tooltip="true"
          v-if="ContractDrugcolumns.showColumn('contractCode')" />
        <el-table-column prop="drugCode" label="药品编码" align="center" :show-overflow-tooltip="true"
          v-if="ContractDrugcolumns.showColumn('drugCode')" />
        <el-table-column prop="drugId" label="drugId" align="center" v-if="ContractDrugcolumns.showColumn('drugId')" />
        <el-table-column prop="drugName" label="药品名称" align="center" :show-overflow-tooltip="true"
          v-if="ContractDrugcolumns.showColumn('drugName')" />

        <el-table-column prop="drugMnemonicCode" label="药品助记码" align="center" :show-overflow-tooltip="true"
          v-if="ContractDrugcolumns.showColumn('drugMnemonicCode')" />
        <el-table-column prop="drugSpecifications" label="药品规格" align="center" :show-overflow-tooltip="true"
          v-if="ContractDrugcolumns.showColumn('drugSpecifications')" />
        <el-table-column prop="drugCategory" label="药品类别" align="center" :show-overflow-tooltip="true"
          v-if="ContractDrugcolumns.showColumn('drugCategory')" />
        <el-table-column prop="drugVarietyName" label="药品品种名称" align="center" :show-overflow-tooltip="true"
          v-if="ContractDrugcolumns.showColumn('drugVarietyName')" />
        <el-table-column prop="drugClassification" label="药物分类" align="center" :show-overflow-tooltip="true"
          v-if="ContractDrugcolumns.showColumn('drugClassification')"
          :formatter="(row) => getDrugClassificationName(row.drugClassification)" />
        <el-table-column prop="tracingSourceCode" label="溯源码" align="center" :show-overflow-tooltip="true"
          v-if="ContractDrugcolumns.showColumn('tracingSourceCode')" />
        <el-table-column prop="drugBatchNumber" label="批号" align="center" :show-overflow-tooltip="true"
          v-if="ContractDrugcolumns.showColumn('drugBatchNumber')" />
        <el-table-column prop="minunit" label="最小单位" align="center" :show-overflow-tooltip="true"
          v-if="ContractDrugcolumns.showColumn('minunit')" />
        <el-table-column prop="produceName" label="生产厂家" align="center" :show-overflow-tooltip="true"
          v-if="ContractDrugcolumns.showColumn('produceName')" />
        <el-table-column prop="packageRatio" label="转换系数" align="center"
          v-if="ContractDrugcolumns.showColumn('packageRatio')" />
        <el-table-column prop="packageUnit" label="包装单位" align="center" :show-overflow-tooltip="true"
          v-if="ContractDrugcolumns.showColumn('packageUnit')" />
        <el-table-column prop="hisID" label="hisid" align="center" :show-overflow-tooltip="true"
          v-if="ContractDrugcolumns.showColumn('hisID')" />
        <el-table-column prop="price" label="价格" align="center" v-if="ContractDrugcolumns.showColumn('price')" />
        <el-table-column prop="refCode" label="溯源码编号绑定" align="center" :show-overflow-tooltip="true"
          v-if="ContractDrugcolumns.showColumn('refCode')" />
        <el-table-column prop="defaultLocation" label="默认货位" align="center" :show-overflow-tooltip="true"
          v-if="ContractDrugcolumns.showColumn('defaultLocation')" />
        <el-table-column prop="changeTime" label="修改时间" align="center" :show-overflow-tooltip="true"
          v-if="ContractDrugcolumns.showColumn('changeTime')" />
        <el-table-column prop="creationTime" label="创建时间" align="center" :show-overflow-tooltip="true"
          v-if="ContractDrugcolumns.showColumn('creationTime')" />
        <el-table-column prop="hisPrice" label="HIS价格" align="center"
          v-if="ContractDrugcolumns.showColumn('hisPrice')" />
        <el-table-column prop="kfEnable" label="库房禁用" align="center" :show-overflow-tooltip="true"
          v-if="ContractDrugcolumns.showColumn('kfEnable')" />
        <el-table-column prop="yfEnable" label="药房禁用" align="center" :show-overflow-tooltip="true"
          v-if="ContractDrugcolumns.showColumn('yfEnable')" />

        <el-table-column prop="states" label="启用状态" align="center" v-if="ContractDrugcolumns.showColumn('states')">
          <template #default="scope">
            <dict-tag :options="ContractDrugoptions.statesOptions" :value="scope.row.states" />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160">
          <template #default="scope">
            <el-button type="primary" size="small" icon="view" ContractDrugtitle="详情"
              @click="ContractDrughandlePreview(scope.row)"></el-button>
            <el-button type="success" size="small" icon="edit" ContractDrugtitle="编辑"
              v-hasPermi="['supplycontractdrug:edit']" @click="ContractDrughandleUpdate(scope.row)"></el-button>
            <el-button type="danger" size="small" icon="delete" ContractDrugtitle="删除"
              v-hasPermi="['supplycontractdrug:delete']" @click="ContractDrughandleDelete(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination :total="ContractDrugtotal" v-model:page="ContractDrugqueryParams.pageNum"
        v-model:limit="ContractDrugqueryParams.pageSize" @pagination="ContractDruggetList" />


      <el-dialog :ContractDrugtitle="ContractDrugtitle" :lock-scroll="false" v-model="ContractDrugopen">
        <el-form ref="ContractDrugformRef" :model="ContractDrugform" :ContractDrugrules="ContractDrugrules"
          label-width="100px">
          <el-row :gutter="20">

            <el-col :lg="12" v-if="ContractDrugopertype != 1">
              <el-form-item label="id" prop="id">
                <el-input-number v-model.number="ContractDrugform.id" controls-position="right" placeholder="请输入id"
                  :disabled="true" />
              </el-form-item>
            </el-col>

            <el-col :lg="12">
              <el-form-item label="合同编号" prop="contractCode">
                <el-input v-model="ContractDrugform.contractCode" placeholder="请输入合同编号" />
              </el-form-item>
            </el-col>

            <el-col :lg="12">
              <el-form-item label="药品编码" prop="drugCode">
                <el-input v-model="ContractDrugform.drugCode" placeholder="请输入药品编码" />
              </el-form-item>
            </el-col>

            <el-col :lg="12">
              <el-form-item label="启用状态" prop="states">
                <el-radio-group v-model="ContractDrugform.states">
                  <el-radio v-for="item in ContractDrugoptions.statesOptions" :key="item.dictValue"
                    :value="item.dictValue">
                    {{ item.dictLabel }}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <template #footer v-if="ContractDrugopertype != 3">
          <el-button text @click="ContractDrugcancel">{{ $t('btn.cancel') }}</el-button>
          <el-button type="primary" @click="ContractDrugsubmitForm">{{ $t('btn.submit') }}</el-button>
        </template>
      </el-dialog>
    </div>
  </div>

</template>

<script setup name="supplycontract">
import {
  listSupplyContract,
  addSupplyContract, delSupplyContract,
  updateSupplyContract, getSupplyContract,
  clearSupplyContract,
}
  from '@/api/business/supplycontract.js'
import importData from '@/components/ImportData'
const { proxy } = getCurrentInstance()
const Contractids = ref([])
const Contractloading = ref(false)
const ContractshowSearch = ref(true)
const ContractqueryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  sort: '',
  sortType: 'asc',
  contractCode: undefined,
  contractName: undefined,
  supplierName: undefined,
})
const Contractcolumns = ref([
  { visible: true, align: 'center', type: '', prop: 'id', label: '合同的唯一标识符' },
  { visible: true, align: 'center', type: '', prop: 'contractCode', label: '合同编号', showOverflowTooltip: true },
  { visible: true, align: 'center', type: '', prop: 'contractName', label: '合同名称', showOverflowTooltip: true },
  { visible: true, align: 'center', type: '', prop: 'startDate', label: '合同开始日期', showOverflowTooltip: true },
  { visible: true, align: 'center', type: '', prop: 'endDate', label: '合同结束日期', showOverflowTooltip: true },
  { visible: true, align: 'center', type: 'dict', prop: 'contractType', label: '合同类型', showOverflowTooltip: true },
  { visible: true, align: 'center', type: '', prop: 'supplierName', label: '合同供应商名称', showOverflowTooltip: true },
  { visible: true, align: 'center', type: 'dict', prop: 'states', label: '合同状态', showOverflowTooltip: true },
  { visible: false, align: 'center', type: '', prop: 'createdAt', label: '创建时间', showOverflowTooltip: true },
  { visible: false, align: 'center', type: '', prop: 'createdBy', label: '创建人', showOverflowTooltip: true },
  { visible: false, align: 'center', type: '', prop: 'modifiedAt', label: '修改时间', showOverflowTooltip: true },
  { visible: false, align: 'center', type: '', prop: 'modifiedBy', label: '修改人', showOverflowTooltip: true },
  //{ visible: false, prop: 'actions', label: '操作', type: 'slot', width: '160' }
])
const Contracttotal = ref(0)
const ContractdataList = ref([])
const ContractqueryRef = ref()
const ContractdefaultTime = ref([new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 2, 1, 23, 59, 59)])


var ContractdictParams = [
]


function ContractgetList() {
  Contractloading.value = true
  listSupplyContract(ContractqueryParams).then(res => {
    const { code, data } = res
    if (code == 200) {
      ContractdataList.value = data.result
      Contracttotal.value = data.totalNum
      Contractloading.value = false
    }
  })
}

// 查询
function ContracthandleQuery() {
  ContractqueryParams.pageNum = 1
  ContractgetList()
}

// 重置查询操作
function ContractresetQuery() {
  proxy.resetForm("ContractqueryRef")
  ContracthandleQuery()
}
// 多选框选中数据
function ContracthandleSelectionChange(selection) {
  Contractids.value = selection.map((item) => item.id);
  Contractsingle.value = selection.length != 1
  Contractmultiple.value = !selection.length;
}
// 自定义排序
function ContractsortChange(column) {
  var sort = undefined
  var sortType = undefined

  if (column.prop != null && column.order != null) {
    sort = column.prop
    sortType = column.order

  }
  ContractqueryParams.sort = sort
  ContractqueryParams.sortType = sortType
  ContracthandleQuery()
}

/*************** form操作 ***************/
const ContractformRef = ref()
const Contracttitle = ref('')
// 操作类型 1、add 2、edit 3、view
const Contractopertype = ref(0)
const Contractopen = ref(false)
const Contractstate = reactive({
  Contractsingle: true,
  Contractmultiple: true,
  Contractform: {},
  Contractrules: {
    // contractCode: [{ required: true, message: "合同编号不能为空", trigger: "blur" }],
  },
  Contractoptions: {
    // 合同类型 选项列表 格式 eg:{ dictLabel: '标签', dictValue: '0'}
    contractTypeOptions: [{ dictLabel: '手动合同', dictValue: '手动合同', }],
    statesOptions: [{ dictLabel: '启用', dictValue: '启用' }, { dictLabel: '停用', dictValue: '停用' }],
  }
})

const { Contractform, Contractrules, Contractoptions, Contractsingle, Contractmultiple } = toRefs(Contractstate)

// 关闭dialog
function Contractcancel() {
  Contractopen.value = false
  Contractreset()
}

// 重置表单
function Contractreset() {
  Contractform.value = {
    id: null,
    contractCode: null,
    contractName: null,
    startDate: null,
    endDate: null,
    contractType: null,
    supplierName: null,
    states: null,
    createdAt: null,
    createdBy: null,
    modifiedAt: null,
    modifiedBy: null,
  };
  proxy.resetForm("ContractformRef")
}

/**
 * 查看
 * @param {*} row
 */
function ContracthandlePreview(row) {
  Contractreset()
  const id = row.id
  getSupplyContract(id).then((res) => {
    const { code, data } = res
    if (code == 200) {
      Contractopen.value = true
      Contracttitle.value = '查看'
      Contractopertype.value = 3
      Contractform.value = {
        ...data,
      }
    }
  })
}

// 添加按钮操作
function ContracthandleAdd() {
  Contractreset();
  Contractopen.value = true
  Contracttitle.value = '添加合同'
  Contractopertype.value = 1
}
// 修改按钮操作
function ContracthandleUpdate(row) {
  Contractreset()
  const id = row.id || Contractids.value
  getSupplyContract(id).then((res) => {
    const { code, data } = res
    if (code == 200) {
      Contractopen.value = true
      Contracttitle.value = '修改合同'
      Contractopertype.value = 2

      Contractform.value = {
        ...data,
      }
    }
  })
}

// 添加&修改 表单提交
function ContractsubmitForm() {
  proxy.$refs["ContractformRef"].validate((valid) => {
    if (valid) {

      if (Contractform.value.id != undefined && Contractopertype.value === 2) {
        updateSupplyContract(Contractform.value).then((res) => {
          proxy.$modal.msgSuccess("修改成功")
          Contractopen.value = false
          ContractgetList()
        })
      } else {
        addSupplyContract(Contractform.value).then((res) => {
          proxy.$modal.msgSuccess("新增成功")
          Contractopen.value = false
          ContractgetList()
        })
      }
    }
  })
}

// 删除按钮操作
function ContracthandleDelete(row) {
  const Ids = row.id || Contractids.value

  proxy
    .$confirm('是否确认删除参数编号为"' + Ids + '"的数据项？', "警告", {
      confirmButtonText: proxy.$t('common.ok'),
      cancelButtonText: proxy.$t('common.cancel'),
      type: "warning",
    })
    .then(function () {
      return delSupplyContract(Ids)
    })
    .then(() => {
      ContractgetList()
      proxy.$modal.msgSuccess("删除成功")
    })
}

// 清空
function ContracthandleClear() {
  proxy
    .$confirm("是否确认清空所有数据项?", "警告", {
      confirmButtonText: proxy.$t('common.ok'),
      cancelButtonText: proxy.$t('common.cancel'),
      type: "warning",
    })
    .then(function () {
      return clearSupplyContract()
    })
    .then(() => {
      ContracthandleQuery()
      proxy.$modal.msgSuccess('清空成功')
    })
}

// 导入数据成功处理
const ContracthandleFileSuccess = (response) => {
  consola.log(response)
  // const { item1, item2 } = response.data
  var error = ''
  // item2.forEach((item) => {
  //   error += item.storageMessage + ','
  // })
  proxy.$alert(response + '<p>' + error + '</p>', '导入结果', {
    dangerouslyUseHTMLString: true
  })
  ContractgetList()
}

// 导出按钮操作
function ContracthandleExport() {
  proxy
    .$confirm("是否确认导出合同数据项?", "警告", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
    .then(async () => {
      await proxy.downFile('/business/SupplyContract/export', { ...ContractqueryParams })
    })
}

ContracthandleQuery()



import {
  listSupplier,
  addSupplier, delSupplier,
  updateSupplier, getSupplier,
  clearSupplier,
}
  from '@/api/business/supplier.js'
const Supplierids = ref([])
const Supplierloading = ref(false)
const SuppliershowSearch = ref(true)
const SupplierqueryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  sort: '',
  sortType: 'asc',
  id: undefined,
  supplierName: undefined,
  socialCreditCode: undefined,
  enterpriseAddress: undefined,
  enterprisePhone: undefined,
})
const Suppliercolumns = ref([
  { visible: false, align: 'center', type: '', prop: 'id', label: 'id' },
  { visible: true, align: 'center', type: '', prop: 'supplierName', label: '供应商名称', showOverflowTooltip: true },
  { visible: false, align: 'center', type: '', prop: 'socialCreditCode', label: '社会信用代码', showOverflowTooltip: true },
  { visible: false, align: 'center', type: '', prop: 'enterpriseAddress', label: '企业地址', showOverflowTooltip: true },
  { visible: false, align: 'center', type: '', prop: 'enterprisePhone', label: '企业电话', showOverflowTooltip: true },
  //{ visible: false, prop: 'actions', label: '操作', type: 'slot', width: '160' }
])
const Suppliertotal = ref(0)
const SupplierdataList = ref([])
const SupplierSupplierqueryRef = ref()
const SupplierdefaultTime = ref([new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 2, 1, 23, 59, 59)])


var SupplierdictParams = [
]


function SuppliergetList() {
  Supplierloading.value = true
  listSupplier(SupplierqueryParams).then(res => {
    const { code, data } = res
    if (code == 200) {
      SupplierdataList.value = data.result
      Suppliertotal.value = data.totalNum
      Supplierloading.value = false
    }
  })
}

// 查询
function SupplierhandleQuery() {
  SupplierqueryParams.pageNum = 1
  SuppliergetList()
}

// 重置查询操作
function SupplierresetQuery() {
  proxy.resetForm("SupplierSupplierqueryRef")
  SupplierhandleQuery()
}
// 多选框选中数据
function SupplierhandleSelectionChange(selection) {
  Supplierids.value = selection.map((item) => item.id);
  Suppliersingle.value = selection.length != 1
  Suppliermultiple.value = !selection.length;
}
// 自定义排序
function SuppliersortChange(column) {
  var sort = undefined
  var sortType = undefined

  if (column.prop != null && column.order != null) {
    sort = column.prop
    sortType = column.order

  }
  SupplierqueryParams.sort = sort
  SupplierqueryParams.sortType = sortType
  SupplierhandleQuery()
}

/*************** form操作 ***************/
const SupplierformRef = ref()
const Suppliertitle = ref('')
// 操作类型 1、add 2、edit 3、view
const Supplieropertype = ref(0)
const Supplieropen = ref(false)
const Supplierstate = reactive({
  Suppliersingle: true,
  Suppliermultiple: true,
  Supplierform: {},
  Supplierrules: {
    id: [{ required: true, message: "id不能为空", trigger: "blur", type: "number" }],
  },
  Supplieroptions: {
  }
})

const { Supplierform, Supplierrules, Supplieroptions, Suppliersingle, Suppliermultiple } = toRefs(Supplierstate)

// 关闭dialog
function Suppliercancel() {
  Supplieropen.value = false
  Supplierreset()
}

// 重置表单
function Supplierreset() {
  Supplierform.value = {
    id: null,
    supplierName: null,
    socialCreditCode: null,
    enterpriseAddress: null,
    enterprisePhone: null,
  };
  proxy.resetForm("SupplierformRef")
}

/**
 * 查看
 * @param {*} row
 */
function SupplierhandlePreview(row) {
  Supplierreset()
  const id = row.id
  getSupplier(id).then((res) => {
    const { code, data } = res
    if (code == 200) {
      Supplieropen.value = true
      Suppliertitle.value = '查看'
      Supplieropertype.value = 3
      Supplierform.value = {
        ...data,
      }
    }
  })
}

// 添加按钮操作
function SupplierhandleAdd() {
  Supplierreset();
  Supplieropen.value = true
  Suppliertitle.value = '添加供应商基础功能'
  Supplieropertype.value = 1
}
// 修改按钮操作
function SupplierhandleUpdate(row) {
  Supplierreset()
  const id = row.id || ids.value
  getSupplier(id).then((res) => {
    const { code, data } = res
    if (code == 200) {
      Supplieropen.value = true
      Suppliertitle.value = '修改供应商基础功能'
      Supplieropertype.value = 2

      Supplierform.value = {
        ...data,
      }
    }
  })
}

// 添加&修改 表单提交
function SuppliersubmitForm() {
  proxy.$refs["SupplierformRef"].validate((valid) => {
    if (valid) {

      if (Supplierform.value.id != undefined && Supplieropertype.value === 2) {
        updateSupplier(Supplierform.value).then((res) => {
          proxy.$modal.msgSuccess("修改成功")
          Supplieropen.value = false
          SuppliergetList()
        })
      } else {
        addSupplier(Supplierform.value).then((res) => {
          proxy.$modal.msgSuccess("新增成功")
          Supplieropen.value = false
          SuppliergetList()
        })
      }
    }
  })
}

// 删除按钮操作
function SupplierhandleDelete(row) {
  const Ids = row.id || Supplierids.value

  proxy
    .$confirm('是否确认删除参数编号为"' + Ids + '"的数据项？', "警告", {
      confirmButtonText: proxy.$t('common.ok'),
      cancelButtonText: proxy.$t('common.cancel'),
      type: "warning",
    })
    .then(function () {
      return delSupplier(Ids)
    })
    .then(() => {
      SuppliergetList()
      proxy.$modal.msgSuccess("删除成功")
    })
}

// 清空
function SupplierhandleClear() {
  proxy
    .$confirm("是否确认清空所有数据项?", "警告", {
      confirmButtonText: proxy.$t('common.ok'),
      cancelButtonText: proxy.$t('common.cancel'),
      type: "warning",
    })
    .then(function () {
      return clearSupplier()
    })
    .then(() => {
      SupplierhandleQuery()
      proxy.$modal.msgSuccess('清空成功')
    })
}

// 导入数据成功处理
const SupplierhandleFileSuccess = (response) => {
  const { item1, item2 } = response.data
  var error = ''
  item2.forEach((item) => {
    error += item.storageMessage + ','
  })
  proxy.$alert(item1 + '<p>' + error + '</p>', '导入结果', {
    dangerouslyUseHTMLString: true
  })
  SuppliergetList()
}

// 导出按钮操作
function SupplierhandleExport() {
  proxy
    .$confirm("是否确认导出供应商基础功能数据项?", "警告", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
    .then(async () => {
      await proxy.downFile('/business/Supplier/export', { ...SupplierqueryParams })
    })
}

SupplierhandleQuery()



import {
  listSupplyContractDrug,
  addSupplyContractDrug, delSupplyContractDrug,
  updateSupplyContractDrug, getSupplyContractDrug,
  clearSupplyContractDrug,
}
  from '@/api/business/supplycontractdrug.js'
import consola from 'consola';
const ContractDrugids = ref([])
const ContractDrugloading = ref(false)
const ContractDrugshowSearch = ref(true)
const ContractDrugqueryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  sort: '',
  sortType: 'asc',
  contractCode: undefined,
  drugCode: undefined,
})
const ContractDrugcolumns = ref([
  { visible: false, align: 'center', type: '', prop: 'id', label: 'id' },
  { visible: false, align: 'center', type: '', prop: 'contractCode', label: '合同编号', showOverflowTooltip: true },
  { visible: true, align: 'center', type: '', prop: 'drugCode', label: '药品编码', showOverflowTooltip: true },
  { visible: true, align: 'center', type: 'dict', prop: 'states', label: '启用状态', showOverflowTooltip: true },
  //{ visible: false, prop: 'actions', label: '操作', type: 'slot', width: '160' }
  { visible: false, align: 'center', type: '', prop: 'drugId', label: 'drugId' },
  { visible: true, align: 'center', type: '', prop: 'drugName', label: '药品名称', showOverflowTooltip: true },
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
  { visible: false, align: 'center', type: '', prop: 'hisID', label: 'hisid', showOverflowTooltip: true },
  { visible: false, align: 'center', type: '', prop: 'price', label: '价格' },
  { visible: false, align: 'center', type: '', prop: 'refCode', label: '溯源码编号绑定', showOverflowTooltip: true },
  { visible: false, align: 'center', type: '', prop: 'defaultLocation', label: '默认货位', showOverflowTooltip: true },
  { visible: false, align: 'center', type: '', prop: 'changeTime', label: '修改时间', showOverflowTooltip: true },
  { visible: false, align: 'center', type: '', prop: 'creationTime', label: '创建时间', showOverflowTooltip: true },
  { visible: false, align: 'center', type: '', prop: 'hisPrice', label: 'HIS价格' },
  { visible: false, align: 'center', type: '', prop: 'kfEnable', label: '库房禁用', showOverflowTooltip: true },
  { visible: false, align: 'center', type: '', prop: 'yfEnable', label: '药房禁用', showOverflowTooltip: true },

])
const drugClassificationMap = {
  1: '普通',
  2: '麻醉药品',
  3: '精神一类',
  4: '精神二类',
  5: '毒性药品',
  6: '贵重'
};
const getDrugClassificationName = (value) => {
  return drugClassificationMap[value] || '未知分类';
};
const ContractDrugtotal = ref(0)
const ContractDrugdataList = ref([])
const ContractDrugqueryRef = ref()
const ContractDrugdefaultTime = ref([new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 2, 1, 23, 59, 59)])


var ContractDrugdictParams = [
]


function ContractDruggetList() {
  ContractDrugloading.value = true
  listSupplyContractDrug(ContractDrugqueryParams).then(res => {
    console.log("data", res.data)
    const { code, data } = res
    if (code == 200) {
      ContractDrugdataList.value = data.result
      ContractDrugtotal.value = data.totalNum
      ContractDrugloading.value = false
    }
  })
}

// 查询
function ContractDrughandleQuery() {
  ContractDrugqueryParams.pageNum = 1
  ContractDruggetList()
}

// 重置查询操作
function ContractDrugresetQuery() {
  proxy.resetForm("ContractDrugqueryRef")
  ContractDrughandleQuery()
}
// 多选框选中数据
function ContractDrughandleSelectionChange(selection) {
  ContractDrugids.value = selection.map((item) => item.id);
  ContractDrugsingle.value = selection.length != 1
  ContractDrugmultiple.value = !selection.length;
}
// 自定义排序
function ContractDrugsortChange(column) {
  var sort = undefined
  var sortType = undefined

  if (column.prop != null && column.order != null) {
    sort = column.prop
    sortType = column.order

  }
  ContractDrugqueryParams.sort = sort
  ContractDrugqueryParams.sortType = sortType
  ContractDrughandleQuery()
}

/*************** form操作 ***************/
const ContractDrugformRef = ref()
const ContractDrugtitle = ref('')
// 操作类型 1、add 2、edit 3、view
const ContractDrugopertype = ref(0)
const ContractDrugopen = ref(false)
const ContractDrugstate = reactive({
  ContractDrugsingle: true,
  ContractDrugmultiple: true,
  ContractDrugform: {},
  ContractDrugrules: {
    // contractCode: [{ required: true, message: "合同编号不能为空", trigger: "blur" }],
    // drugCode: [{ required: true, message: "药品编码不能为空", trigger: "blur" }],
  },
  ContractDrugoptions: {
    // 启用状态 选项列表 格式 eg:{ dictLabel: '标签', dictValue: '0'}
    statesOptions: [{ dictLabel: '标签', dictValue: '0' }],
  }
})

const { ContractDrugform, ContractDrugrules, ContractDrugoptions, ContractDrugsingle, ContractDrugmultiple } = toRefs(ContractDrugstate)

// 关闭dialog
function ContractDrugcancel() {
  ContractDrugopen.value = false
  ContractDrugreset()
}

// 重置表单
function ContractDrugreset() {
  ContractDrugform.value = {
    id: null,
    contractCode: null,
    drugCode: null,
    states: null,
  };
  proxy.resetForm("ContractDrugformRef")
}

/**
 * 查看
 * @param {*} row
 */
function ContractDrughandlePreview(row) {
  ContractDrugreset()
  const id = row.id
  getSupplyContractDrug(id).then((res) => {
    const { code, data } = res
    if (code == 200) {
      ContractDrugopen.value = true
      ContractDrugtitle.value = '查看'
      ContractDrugopertype.value = 3
      ContractDrugform.value = {
        ...data,
      }
    }
  })
}

// 添加按钮操作
function ContractDrughandleAdd() {
  ContractDrugreset();
  ContractDrugopen.value = true
  ContractDrugtitle.value = '添加合同药品'
  ContractDrugopertype.value = 1
}
// 修改按钮操作
function ContractDrughandleUpdate(row) {
  ContractDrugreset()
  const id = row.id || ContractDrugids.value
  getSupplyContractDrug(id).then((res) => {
    const { code, data } = res
    if (code == 200) {
      ContractDrugopen.value = true
      ContractDrugtitle.value = '修改合同药品'
      ContractDrugopertype.value = 2

      ContractDrugform.value = {
        ...data,
      }
    }
  })
}

// 添加&修改 表单提交
function ContractDrugsubmitForm() {
  proxy.$refs["ContractDrugformRef"].validate((valid) => {
    if (valid) {

      if (ContractDrugform.value.id != undefined && ContractDrugopertype.value === 2) {
        updateSupplyContractDrug(ContractDrugform.value).then((res) => {
          proxy.$modal.msgSuccess("修改成功")
          ContractDrugopen.value = false
          ContractDruggetList()
        })
      } else {
        addSupplyContractDrug(ContractDrugform.value).then((res) => {
          proxy.$modal.msgSuccess("新增成功")
          ContractDrugopen.value = false
          ContractDruggetList()
        })
      }
    }
  })
}

// 删除按钮操作
function ContractDrughandleDelete(row) {
  const Ids = row.id || ContractDrugids.value

  proxy
    .$confirm('是否确认删除参数编号为"' + Ids + '"的数据项？', "警告", {
      confirmButtonText: proxy.$t('common.ok'),
      cancelButtonText: proxy.$t('common.cancel'),
      type: "warning",
    })
    .then(function () {
      return delSupplyContractDrug(Ids)
    })
    .then(() => {
      ContractDruggetList()
      proxy.$modal.msgSuccess("删除成功")
    })
}

// 清空
function ContractDrughandleClear() {
  proxy
    .$confirm("是否确认清空所有数据项?", "警告", {
      confirmButtonText: proxy.$t('common.ok'),
      cancelButtonText: proxy.$t('common.cancel'),
      type: "warning",
    })
    .then(function () {
      return clearSupplyContractDrug()
    })
    .then(() => {
      ContractDrughandleQuery()
      proxy.$modal.msgSuccess('清空成功')
    })
}

// 导入数据成功处理
const ContractDrughandleFileSuccess = (response) => {
  const { item1, item2 } = response.data
  var error = ''
  item2.forEach((item) => {
    error += item.storageMessage + ','
  })
  proxy.$alert(item1 + '<p>' + error + '</p>', '导入结果', {
    dangerouslyUseHTMLString: true
  })
  ContractDruggetList()
}

// 导出按钮操作
function ContractDrughandleExport() {
  proxy
    .$confirm("是否确认导出合同药品数据项?", "警告", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
    .then(async () => {
      await proxy.downFile('/business/SupplyContractDrug/export', { ...ContractDrugqueryParams })
    })
}

ContractDrughandleQuery()
function gysclick(row) {
  ContractqueryParams.supplierName = row.supplierName
  ContractgetList()
}
function drugsclick(row) {
  console.log(row.contractCode);
  ContractDrugqueryParams.contractCode = row.contractCode
  ContractDruggetList()
}
</script>
<style>
.table-content {
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.table-item1 {
  /* width: 5%; */
  /* height: 40px; */
  flex: 1;
}

.table-item2 {
  /* width: 70%; */
  flex: 2;
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