import { Grid, GridColumn, Button, Dropdown, DropdownMenu, DropdownItem, Pager } from '@opentiny/vue';
import { resolveComponent, openBlock, createElementBlock, createVNode, withCtx, Fragment, renderList, createBlock, renderSlot, createTextVNode, toDisplayString, createCommentVNode } from 'vue';

var script = {
  name: "s-list-table",
  components: {
    "tiny-grid": Grid,
    "tiny-grid-column": GridColumn,
    "tiny-button": Button,
    "tiny-dropdown": Dropdown,
    "tiny-dropdown-menu": DropdownMenu,
    "tiny-dropdown-item": DropdownItem,
    "tiny-pager": Pager
  },
  props: {
    isLoading: {
      // 表格是否显示加载中
      type: Boolean,
      default: false
    },
    tableData: {
      // 表格数据
      type: Array,
      default: () => []
    },
    tableDataTotal: {
      // 表格数据总数
      type: Number,
      default: 0
    },
    size: {
      // 表格尺寸
      type: String,
      default: "small"
    },
    isBorder: {
      // 是否带有纵向边框
      type: Boolean,
      default: true
    },
    align: {
      // 对齐方式
      type: String,
      default: "center"
    },
    columnConfig: {
      // 列项配置
      type: Array,
      default: () => []
    },
    columnMinWidth: {
      // 列最小宽度
      type: [Number, String],
      default: 120
    },
    listParams: {
      // 查询请求参数
      type: Object,
      default: () => {
        return { current: 1, size: 10 };
      }
    },
    pageSizes: {
      // 指定可选择的每页显示条数
      type: Array,
      default: () => {
        return [5, 10, 15, 20, 50];
      }
    }
  },
  data() {
    return {
      test: "test"
    };
  },
  computed: {
    // 真实显示的表格列配置项
    filterColumnConfig() {
      return this.columnConfig;
    },
    // 是否启用分页，通过检查【分页请求参数是否有属性】
    isNeedPager() {
      return Boolean(this.listParams.current && this.listParams.size);
    }
  },
  emits: ["onCellClick", "onSelectAll", "onFetchList"],
  methods: {
    // 单元格点击事件
    cellClickEvent({ row, rowIndex, column, columnIndex }) {
      if (!column.type) {
        this.$emit("onCellClick", { row, rowIndex, column, columnIndex });
      }
    },
    // 监听全选
    selectAll(arg1, arg2) {
      if (!column.type) {
        this.$emit("onSelectAll", arg1, arg2);
      }
    },
    // 监听切换【页码】
    currentChange(newPageNum) {
      this.$emit("onFetchList", { current: newPageNum });
    },
    // 监听切换【每页条数】
    sizeChange(newPageSize) {
      console.log(123, newPageSize);
      this.$emit("onFetchList", {
        current: 1, // 重新获取第一页的数据
        size: newPageSize
      });
    }
  },
  setup(props, { emit }) {
    // 补充逻辑
  }
};

const _hoisted_1 = { class: "s-list-table" };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_tiny_grid_column = resolveComponent("tiny-grid-column");
  const _component_tiny_grid = resolveComponent("tiny-grid");
  const _component_tiny_pager = resolveComponent("tiny-pager");

  return (openBlock(), createElementBlock("div", _hoisted_1, [
    createVNode(_component_tiny_grid, {
      resizable: "",
      "tooltip-config": {
        placement: 'top',
        visibleArrow: true,
        enterable: true,
        effect: 'dark'
      },
      ref: "tinyGridTable",
      "min-height": "300",
      "max-height": "500",
      data: $props.tableData,
      border: $props.isBorder,
      size: $props.size,
      "seq-serial": "",
      "highlight-current-row": true,
      align: $props.align,
      loading: $props.isLoading,
      onCellClick: $options.cellClickEvent,
      onSelectAll: $options.selectAll
    }, {
      default: withCtx(() => [
        (openBlock(true), createElementBlock(Fragment, null, renderList($options.filterColumnConfig, (item, index) => {
          return (openBlock(), createBlock(_component_tiny_grid_column, {
            key: index,
            title: item.title,
            field: item.field,
            sortable: item.sortable,
            filter: item.filter,
            editor: item.editor,
            "show-overflow": 'tooltip',
            "min-width": $props.columnMinWidth || 'auto'
          }, {
            default: withCtx((data) => [
              renderSlot(_ctx.$slots, item.field, {
                data: data.row[item.field],
                row: data.row
              }, () => [
                createTextVNode(toDisplayString(data.row[item.field]), 1 /* TEXT */)
              ])
            ]),
            _: 2 /* DYNAMIC */
          }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["title", "field", "sortable", "filter", "editor", "min-width"]))
        }), 128 /* KEYED_FRAGMENT */))
      ]),
      _: 3 /* FORWARDED */
    }, 8 /* PROPS */, ["data", "border", "size", "align", "loading", "onCellClick", "onSelectAll"]),
    ($options.isNeedPager)
      ? (openBlock(), createBlock(_component_tiny_pager, {
          key: 0,
          "current-page": $props.listParams.current,
          "page-size": $props.listParams.size,
          total: $props.tableDataTotal,
          "page-sizes": $props.pageSizes,
          layout: "total, prev, pager, next, jumper, sizes",
          onCurrentChange: $options.currentChange,
          onSizeChange: $options.sizeChange
        }, null, 8 /* PROPS */, ["current-page", "page-size", "total", "page-sizes", "onCurrentChange", "onSizeChange"]))
      : createCommentVNode("v-if", true)
  ]))
}

script.render = render;
script.__file = "src/components/list-table/index.vue";

export { script as default };
//# sourceMappingURL=index.mjs.map
