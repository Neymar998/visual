<template>
  <div class="box">
    <div class="box-left" style="color:white">
      <div class="box-left-card">
        <section>
          <div>较上日+{{ store.chinaAdd.localConfirmH5 }}</div>
          <div>{{ store.chianTotal.localConfirm }}</div>
          <div>本土现有确诊</div>
        </section>
        <section>
          <div>较上日+{{ store.chinaAdd.nowConfirm }}</div>
          <div>{{ store.chianTotal.nowConfirm }}</div>
          <div>现有确诊</div>
        </section>
        <section>
          <div>较上日+{{ store.chinaAdd.confirm }}</div>
          <div>{{ store.chianTotal.confirm }}</div>
          <div>累计确诊</div>
        </section>
        <section>
          <div>较上日+{{ store.chinaAdd.noInfect }}</div>
          <div>{{ store.chianTotal.noInfect }}</div>
          <div>无症状感染者</div>
        </section>
        <section>
          <div>较上日+{{ store.chinaAdd.importedCase }}</div>
          <div>{{ store.chianTotal.importedCase }}</div>
          <div>境外输入</div>
        </section>
        <section>
          <div>较上日+{{ store.chinaAdd.dead }}</div>
          <div>{{ store.chianTotal.dead }}</div>
          <div>累计死亡</div>
        </section>
      </div>
      <div class="box-left-pie"> </div>
      <div class="box-left-line"></div>

    </div>
    <div class="box-middle" id="china">
      <div></div>
    </div>
    <div class="box-right" style="color:white">
      <table border="1" cellspacing="0" class="table" v-show="store.item.length">
        <thead>
          <tr>
            <th>地区:</th>
            <th>新增确诊：</th>
            <th>累计确诊：</th>
            <th>治愈：</th>
            <th>死亡：</th>
          </tr>
        </thead>
        <transition-group tag="tbody" enter-active-class="animate__animated animate__flipInY">
          <!-- 动画绑定key唯一值，不然diff算法不会更新不会有动画 -->
          <tr v-for="(item, index) in store.item" :key="(item.name + index + item.today.confirm + item.total.confirm)">
            <td align="center">{{ item.name }}</td>
            <td align="center">{{ item.today.confirm }}</td>
            <td align="center">{{ item.total.confirm }}</td>
            <td align="center">{{ item.total.heal }}</td>
            <td align="center">{{ item.total.dead }}</td>
          </tr>
        </transition-group>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from './store'
import { onMounted } from "vue";
import { geoCoordMap } from './assets/geoMap'
import * as echarts from 'echarts';
import './assets/china'
import 'animate.css'
const store = useStore()

onMounted(async () => {
  await store.getList()
  initCharts()
  initPie()
  initLine()
})
const initCharts = () => {
  const city = store.list.diseaseh5Shelf.areaTree[0].children
  store.item = city[5].children

  const data = city.map(v => {
    return {
      name: v.name,
      value: geoCoordMap[v.name].concat(v.total.nowConfirm),
      chilren: v.children
    }
  })
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.getElementById('china') as HTMLElement);

  myChart.setOption({
    geo: {
      map: "china",
      aspectScale: 0.8,
      layoutCenter: ["50%", "50%"],
      layoutSize: "100%",
      regions: [
        {
          name: "南海诸岛",
          itemStyle: {
            areaColor: "rgba(0, 10, 52, 1)",
            borderColor: "rgba(0, 10, 52, 1)",
            opacity: 0,
            label: {
              show: false,
              color: "#009cc9",
            },

          },
          label: {
            show: false,
            color: "#FFFFFF",
            fontSize: 12,
          },
        },
      ],
    },
    itemStyle: {
      areaColor: {
        type: "linear-gradient",
        x: 0,
        y: 1200,
        x2: 1000,
        y2: 0,
        colorStops: [
          {
            offset: 0,
            color: "#152E6E", // 0% 处的颜色
          },
          {
            offset: 1,
            color: "#0673AD", // 50% 处的颜色
          },
        ],
        global: true, // 缺省为 false
      },
      shadowColor: "#0f5d9d",
      shadowOffsetX: 2,
      shadowOffsetY: 10,
      opacity: 0.8,
      emphasis: {
        focus: 'self'
      }
    },
    series: [
      {
        type: "map",
        map: "china",
        aspectScale: 0.8,
        layoutCenter: ["50%", "50%"], //地图位置
        layoutSize: "100%",
        zoom: 1, //当前视角的缩放比例
        roam: false, //是否开启平游或缩放
        scaleLimit: {
          //滚轮缩放的极限控制
          min: 1,
          max: 2,
        },
        label: {
          show: true,
          color: "#FFFFFF",
          fontSize: 12,
        },
        itemStyle: {
          areaColor: "#0c3653",
          borderColor: "#1cccff",
          borderWidth: 1.8,

        },
        emphasis: {
          areaColor: "#56b1da",
          label: {
            show: true,
            color: "#fff",

          },
        },
        data: data,
      },
      {
        type: 'scatter',
        coordinateSystem: 'geo',
        // symbol: 'image://http://ssq168.shupf.cn/data/biaoji.png',
        // symbolSize: [30, 120],
        // symbolOffset: [0, '-40%'],
        symbol: 'pin',
        symbolSize: [45, 45],
        label: {
          show: true,
          color: '#fff',
          formatter(value: any) {
            return value.data.value[2]
          }

        },
        itemStyle: {
          color: '#D8BC37', //标志颜色
        },
        data: data,
      },
    ],
  });

  myChart.on('click', (e: any) => {
    store.item = e.data.chilren
  })
}
const initPie = () => {
  var pie = echarts.init(document.querySelector('.box-left-pie') as HTMLElement);

  pie.setOption({
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        itemStyle: {
          borderRadius: 5,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: true,
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 15,
          }
        },
        data: store.cityDetail.map(v => {
          return {
            name: v.city,
            value: v.nowConfirm
          }
        })
      }
    ]
  })


}
const initLine = () => {
  const myChart = echarts.init(document.querySelector('.box-left-line') as HTMLElement)
  myChart.setOption({
    backgroundColor: '#223651',
    xAxis: {
      type: 'category',
      data: store.cityDetail.map(v => v.city),
      axisLine: {
        lineStyle: {
          color: '#fff'
        }
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: '#fff'
        }
      }
    },
    tooltip: {
      trigger: 'axis'
    },
    label: {
      show: true
    },
    series: [
      {
        data: store.cityDetail.map(v => v.confirm),
        type: 'line',
        smooth: true
      }
    ]
  })
}
</script>


<style lang="less" scoped>
.box {
  display: flex;
  height: 100%;
  overflow: hidden;
  background: url('./assets/1.jpg') no-repeat;
  background-size: 100%;

  &-left {
    width: 400px;

    &-pie {
      height: 300px;
    }

    &-line {
      height: 300px;

    }

    &-card {
      display: grid;
      grid-template-columns: auto auto auto;
      grid-template-rows: auto auto;
      background-color: rgba(172, 185, 180, 0.5);

      section {
        font-size: 16px;
        border: 1px solid black;
        padding: 5px 10px;
        display: flex;
        flex-direction: column;
        align-items: center;

        div:nth-child(2) {
          color: rgb(63, 63, 96);
          padding: 10px 0;
          font-size: 20px;
          font-weight: bold;
        }
      }
    }
  }

  &-middle {
    flex: 1;
  }

  &-right {
    width: 400px;
  }
}

.table {
  width: 10px;
  background: rgba(rgb(68, 115, 91), 0.8);
  font-size: 15px;

  tr {
    th {
      padding: 5px;
      white-space: nowrap;
    }

    td {
      padding: 2px 2px;
      white-space: nowrap;

      &:first-child {
        max-width: 100px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>