import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// third-party
import ReactApexChart from 'react-apexcharts';

// chart options
const areaChartOptions = {
    chart: {
        height: 450,
        type: 'area',
        toolbar: {
            show: false
        }
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'smooth',
        width: 2
    },
    grid: {
        strokeDashArray: 0
    }
};

// ==============================|| INCOME AREA CHART ||============================== //

const IncomeAreaChart = ({}) => {
    const [options, setOptions] = useState(areaChartOptions);

    useEffect(() => {
        setOptions((prevState) => ({
            ...prevState,
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                labels: {
                    style: {}
                },
                axisBorder: {
                    show: true
                },
                tickAmount: 11
            },
            yaxis: {
                labels: {
                    style: {}
                }
            },
            grid: {},
            tooltip: {
                theme: 'light'
            }
        }));
    }, []);

    const [series, setSeries] = useState([
        {
            name: 'Page Views',
            data: [0, 86, 28, 115, 48, 210, 136]
        },
        {
            name: 'Sessions',
            data: [0, 43, 14, 56, 24, 105, 68]
        }
    ]);

    useEffect(() => {
        setSeries([
            {
                name: 'Page Views',
                data: [76, 85, 101, 98, 87, 105, 91, 114, 94, 86, 115, 35]
            },
            {
                name: 'Sessions',
                data: [110, 60, 150, 35, 60, 36, 26, 45, 65, 52, 53, 41]
            }
        ]);
    }, []);

    return <ReactApexChart options={options} series={series} type="area" height={450} />;
};

IncomeAreaChart.propTypes = {
    slot: PropTypes.string
};

export default IncomeAreaChart;
