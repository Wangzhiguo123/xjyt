//生产监控报警表头信息
export const proColumnCon = [
    {
        field: "id",
        title: "序号",
        width: "70",
      },
      {
        field: "linkObject",
        title: "报警对象",
        width: "100",
      },
      {
        field: "alertTime",
        title: "报警时间",
        width: "100",
      },
      // {
      //   field: "location",
      //   title: "位置",
      //   width: "80",
      // },
      {
        field: "status",
        title: "状态",
        width: "80",
      },
      {
        field: "",
        title: "操作",
      },
]
//车辆监控报警表头信息
export const carColumnCon = [
    {
        field: "licensePlateNumber",
        title: "车牌号码",
        width: "70",
      },
      {
        field: "type",
        title: "告警信息",
        width: "100",
      },
      {
        field: "alertTime",
        title: "告警时间",
        width: "80",
      },
      {
        field: "carStatus",
        title: "类型",
        width: "80",
      },
      {
        field: "",
        title: "操作",
      },
]