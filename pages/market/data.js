// 数据格式,数据中只需要包含以下字段和数据格式,开发者可以添加字段,比如id等等,不影响组件显示,
// 组件的返回结果是有菜单数组下标形式返回,
// 如果传入数据中有value,也会返回value,开发者可根据返回的下标获取所选中的菜单
/*
[
	{
		"name":"",	//字符串类型 选填项 菜单名称,如不填,则取第一个子菜单的name值,filter和radio类型则将设置为"筛选"
		"type":""	//字符串类型 必填项 可取值 hierarchy/hierarchy-column/filter/radio  hierarchy/hierarchy-column单或多层级菜单(最多三级); filter筛选多选菜单; radio筛选单选菜单
		"submenu":[	//对象数组类型 必填项 子菜单数据
			{
				"name":"",	//字符串类型 必填项 菜单名称
				"value":"",	//字符串类型 选填项 自定义内容,比如id等等,如果填写了,confirm返回的结果中将返回对应选中的value,若菜单无value字段则返回null,filter类型此字段无效果
				"submenu":[	//对象数组类型 必填项 子菜单数据
					{
						"name":"",	//字符串类型 必填项 菜单名称
						"value":"",	//字符串类型 选填项 自定义内容,比如id等等,如果填写了,confirm返回的结果中将返回对应选中的value,若菜单无value字段则返回null
						"submenu":[	//对象数组类型 必填项 子菜单数据 filter类型无效 
							{
								"name":"",	//字符串类型 必填项 菜单名称 hierarchy类型层级最多到此
								"value":"",	//字符串类型 选填项 自定义内容,比如id等等,如果填写了,confirm返回的结果中将返回对应选中的value,若菜单无value字段则返回null
							}
						]
					}
				]
			}
		]
	}
]
*/


/*
{
	index:[],	//选中菜单的下标数组
	value:[]	//菜单中的valve,结构和下标结果数组一样,只是把下标替换成了value而已
}
*/
// 以下演示数据中 实际使用时候value应该是一个标识,给后台识别所用
// 数据较长，请仔细查看。
export default [{
		"name": '藏品',
		"type": 'radio',
		"submenu": [{
			"submenu": [{
					"name": "藏品",
					"value": "0"
				},
				{
					"name": "盲盒",
					"value": "1"
				}
			]
		}]
	},
	{
		"name": '最新上架',
		"type": 'radio',
		"submenu": [{
			"submenu": [{
					"name": "价格",
					"value": "2"
				},
				{
					"name": "最新",
					"value": "1"
				}
			]
		}]
	},
	{
		"name": '筛选',
		"type": 'radio',
		"submenu": [{
			"submenu": [{
					"name": "纪念",
					"value": "50以下"
				},
				{
					"name": "勋章",
					"value": "50-100"
				}
			]
		}]
	}
]
