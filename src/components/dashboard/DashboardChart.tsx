import React, { useMemo } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

const rawData = [
    {
        day: "Monday",
        data: [{ name: "test" }, { name: "test" }, { name: "test" }],
    },
    {
        day: "Sunday",
        data: [{ name: "test" }],
    },
    {
        day: "Sunday",
        data: [{ name: "test" }],
    },
    {
        day: "Sunday",
        data: [{ name: "test" }],
    },
    {
        day: "Sunday",
        data: [{ name: "test" }],
    },
    {
        day: "Sunday",
        data: [{ name: "test" }],
    },
    {
        day: "Sunday",
        data: [{ name: "test" }],
    },
];

export default function SimpleBarChart() {
    const chartData = useMemo(() => {
        return rawData.map((item) => ({
            day: item.day,             
            total: item.data.length,   
        }));
    }, []);

    return (
        <div className="w-full h-125 bg-[#1a1a1c] p-6 rounded-lg font-sans">
            <h2 className="text-white text-2xl font-semibold mb-6">
                Data Count Per Day
            </h2>

            <div className="w-full h-100">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={chartData}
                        margin={{ top: 20, right: 20, bottom: 20, left: 20 }} >
                        {/* Grid background */}
                        <CartesianGrid stroke="#333333" strokeDasharray="3 3" vertical={false} />

                        {/* Sumbu X (Hari) */}
                        <XAxis
                            dataKey="day"
                            stroke="#9ca3af"
                            tick={{ fill: '#9ca3af' }}
                            axisLine={false}
                            tickLine={false}
                            dy={10}
                        />

                        {/* Sumbu Y (Jumlah) */}
                        <YAxis
                            stroke="#9ca3af"
                            tick={{ fill: '#9ca3af' }}
                            axisLine={false}
                            tickLine={false}
                            allowDecimals={false} // Agar sumbu Y tidak menampilkan angka desimal seperti 1.5
                        />

                        {/* Tooltip */}
                        <Tooltip
                            cursor={{ fill: '#2d3748', opacity: 0.4 }}
                            contentStyle={{ backgroundColor: '#2d3748', border: 'none', borderRadius: '8px', color: '#fff' }}
                        />

                        {/* Bar Chart */}
                        <Bar
                            dataKey="total"
                            name="Jumlah Data" // Nama yang muncul di tooltip
                            fill="#4f46e5" // Warna biru keunguan (Indigo Tailwind)
                            radius={[4, 4, 0, 0]} // Sudut atas melengkung
                            barSize={40}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}