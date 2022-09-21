import { useEffect, useState } from 'react';

// third-party
import ReactApexChart from 'react-apexcharts';
import { getArticleInfo } from '../../api/api';

// chart options
const barChartOptions = {
    chart: {
        type: 'bar',
        height: 365,
        toolbar: {
            show: false
        }
    },
    plotOptions: {
        bar: {
            columnWidth: '15%',
            borderRadius: 4
        }
    },
    dataLabels: {
        enabled: false
    },
    xaxis: {
        axisBorder: {
            show: true
        },
        axisTicks: {
            show: true
        }
    },
    yaxis: {
        show: false
    },
    grid: {
        show: false
    }
};

// ==============================|| MONTHLY BAR CHART ||============================== //

const MonthlyBarChart = () => {
    const [series, setSeries] = useState([
        {
            data: [0, 0, 0]
        }
    ]);

    const [options, setOptions] = useState(barChartOptions);

    useEffect(() => {
        getArticleInfo().then((res) => {
            setSeries([
                {
                    data: [res.Data.shareNum || 0, res.Data.watchNum || 0, res.Data.commentNum || 0]
                }
            ]);
            setOptions((prevState) => ({
                ...prevState,
                xaxis: {
                    categories: ['shareNum', 'watchNum', 'commentNum']
                }
            }));
        });
    }, []);

    return (
        <div id="chart">
            <ReactApexChart options={options} series={series} type="bar" height={440} />
        </div>
    );
};

export default MonthlyBarChart;
