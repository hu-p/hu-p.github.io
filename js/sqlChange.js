$(document).ready(function () {
    // 转换
    $("#btn-conversion").click(function () {
      var value = $("#sqlInput").val();
      var valData = value.toString().substring(0, value.lastIndexOf(',')).split("',")
      console.log('value', value, valData);
      valData = valData.filter((item) => item != '').map((item, index) => {
        console.log('原始值：', item);
        itemList = item.replace(/(^\s*)|(\s*$)/g, "") + '\''
        console.log('替换后值：', itemList);
        var thePrefix = strToCam(itemList.match(/(?<=\`).+?(?=\`)/)?.[0])
        console.log('名称：', thePrefix);
        var type = itemList.match(/(?<=`\s).*?(?=\()/gi)?.[0] || ''
        console.log('类型：', type);
        var isNull = itemList.indexOf('NOT NULL')
        console.log('是否为空：', isNull);
        var theDefaultValue = itemList.match(/(?<=DEFAULT \').+?(?=\')/)?.[0]
        console.log('默认值：', theDefaultValue);
        var describe = itemList.match(/(?<=COMMENT \').+(?=\')/)?.[0]
        console.log('type', type, ['bigint', 'int', 'tinyint'].includes(type));
        ['bigint', 'int', 'tinyint'].includes(type) ? type = 'number' : type = 'string'
        return `${thePrefix}?: ${type};  // ${describe} ${isNull !== -1 ? '【必填】' : ''} ${theDefaultValue === undefined ? '' : '【默认为：' + theDefaultValue + '】'} `
      })
      $('#showSql').val(valData.join('\n').replace(/,/g, ""))
    });
    var time = null
    // 复制
    $("#btn-copy").click(function () {
      $("#showSql").select()
      var done = document.execCommand('Copy')
      if (done) {
        if (!$('#box-alert-box').hasClass("alert-hide") || time !== null) {
          $('#box-alert-box').removeClass();
          clearTimeout(time);
          setTimeout(() => {
            $('#box-alert-box').attr("class", "alert-show")
            time = setTimeout(function () {
              $('#box-alert-box').removeClass("alert-show");
              $('#box-alert-box').attr("class", "alert-hide")
              clearTimeout();
            }, 3000);
          }, 100);
        } else {
          $('#box-alert-box').attr("class", "alert-show")
          time = setTimeout(function () {
            $('#box-alert-box').removeClass("alert-show");
            $('#box-alert-box').attr("class", "alert-hide")
            clearTimeout();
          }, 3000);
        }
      }
    });
    // 关闭弹框
    $(".delete").click(function () {
      clearTimeout(time);
      $('#box-alert-box').attr("class", "alert-hide")
    });
    // 清空
    $("#btn-clear").click(function () {
      $('#showSql').val('')
      $("#sqlInput").val('')
    });
    // 测试
    $("#btn-test").click(function () {
      $('#sqlInput').val(`
      \`id\` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
      \`company_id\` bigint(20) NOT NULL COMMENT '客户公司编码',
      \`bill_no\` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '单据号',
      \`contract_status\` tinyint(4) NOT NULL DEFAULT '10' COMMENT '合同状态(10=正常 20=已过期 30=提前中止)',
      \`display_type\` tinyint(4) NOT NULL DEFAULT '0' COMMENT '显示品牌/品类控制字段(0=品牌 1=品类)',
      \`supplier_no\` varchar(20) NOT NULL COMMENT '供应商编号',
      \`stock_qty\` decimal(12,3) NOT NULL DEFAULT '0.000' COMMENT '库存数量',
      \`before_qty\` decimal(12,3) NOT NULL DEFAULT '0.000' COMMENT '调整前数量',
      \`adjustment_qty\` decimal(12,3) NOT NULL DEFAULT '0.000' COMMENT '调整数量',
      \`settlement_method\` tinyint(4) NOT NULL COMMENT '结算方式 1=半月结 2=月结 3=季结 ',
      \`currency\` tinyint(4) NOT NULL COMMENT '币种(1=人民币 2=港币 3=美元)',
      \`effective_date\` date NOT NULL COMMENT '生效日期',
      \`status\` varchar(20) NOT NULL DEFAULT '10' COMMENT '状态(10=正常 20=审核)',
      \`remarks\` varchar(100) DEFAULT NULL COMMENT '备注',
      \`creator\` varchar(20) NOT NULL COMMENT '创建人',
      \`create_time\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间(不可人为调整)',
      \`modifier\` varchar(20) DEFAULT NULL COMMENT '修改人',
      \`modify_time\` datetime DEFAULT NULL COMMENT '修改时间',
      \`update_time\` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '记录更新时间',
      \`del_tag\` varchar(2) DEFAULT '0' COMMENT '归档删除标识(0=正常归档，删除后数据同步下游 1=归档删除，删除后数据不同步下游',
      \`partion_no\` varchar(20) NOT NULL COMMENT '分库特征码',
      `)
      $("#showSql").val('')
    });
  });

  // 转驼峰
  function strToCam(str) {
    const arr = str.split('_')
    for (var i = 1; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].substr(1, arr[i].length - 1)
    }
    return arr.join('')
  }