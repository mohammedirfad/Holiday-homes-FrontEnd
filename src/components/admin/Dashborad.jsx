import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BarChart, Bar, PieChart, Pie, Cell } from "recharts";

import { getdashBoard } from "../../api/Services/HostsetUp";

function Dashborad() {
  const [barData, setBarData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [arrayorder, setArrayorder] = useState();
  const [monthReport, setmonthreport] = useState([]);
  const [data, setData] = useState(null);
  const [pending, setPending] = useState("");
  const [complete, setcomplele] = useState("");
  const [cancel, setCancell] = useState("");
  const [PaymentComplete, setPaymentComplete] = useState("");

  const token = useSelector((state) => state?.adminAuth?.admin_token);

  const now = new Date();
  const currentMonth = now.getMonth();
  const months = [];

  // Add two months before the current month
  for (let i = 2; i >= 1; i--) {
    const month = new Date(now);
    month.setMonth(currentMonth - i);
    months.push(month.toLocaleString("default", { month: "long" }));
  }

  // Add the current month
  months.push(now.toLocaleString("default", { month: "long" }));

  // Add two months after the current month
  for (let i = 1; i <= 2; i++) {
    const month = new Date(now);
    month.setMonth(currentMonth + i);
    months.push(month.toLocaleString("default", { month: "long" }));
  }

  useEffect(() => {
    if (!data) {
      getdashBoard(token).then((res) => {
        console.log(res);
        if (res.status === 200) {
          setPieData(res.data.data);
          setPending(res.data.data[0]);
          setcomplele(res.data.data[1]);
          setCancell(res.data.data[2]);
          setPaymentComplete(res.data.data[3]);
          setData(true);
          setmonthreport(res.data.result);
        }
      });
    }
  }, []);

  let newPieData = [];

  useEffect(() => {
    // Generate random data for the bar graph

    if (data) {
      const newBarData = [];
      for (let i = 0; i < 5; i++) {
        newBarData.push({
          name: `Bar ${i}`,
          value: monthReport[i]?.profit_count,
        });
      }
      setBarData(newBarData);

      // Generate random data for the pie chart
      const newPieData = [];
      const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];
      for (let i = 0; i < pieData.length; i++) {
        newPieData.push({
          name: `Pie ${i}`,
          value: pieData[i],
          color: colors[i],
        });
      }
      setPieData(newPieData);
    } else {
    }
    return () => {
      setData(null);
      // setData(false)
    };
  }, [data]);

  return (
    <div>
      <div className="flex mx-3">
        <div className="w-full flex justify-center">
          <div className="mx-5 ">
            <h1 className="text-semibold font-semibold text-2xl mt-2">
              Monthly orders{" "}
            </h1>
            <div></div>
            <div className="ml-10 flex">
              <div className="">
                <BarChart width={400} height={300} data={barData}>
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
                <div className="flex -ml-5">
                  {monthReport.map((data) => (
                    <h1 className=" ml-8">{data.month}</h1>
                  ))}
                </div>
              </div>

              <div className="flex mt-10">
                <div className=" -ml-3 ">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b-2 border-gray-200">
                      <tr className="border border-gray-400">
                        <th className="p-3 text-sm font-semibold tracking-wide text-left">
                          month
                        </th>

                        <th className="p-3 text-sm font-semibold tracking-wide text-left">
                          orders
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {monthReport.map((data) => (
                        <tr>
                          <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                            {data.month}
                          </td>
                          <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                            {data.profit_count}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="flex justify-around pt-8 ">
              <div className="justify-center mt-8 ">
                <h1 className="text-3xl">Orders </h1>
                <div className="flex pt-4">
                  <h1 className="text-blue-700 font-bold text-lg">
                    Pending :{" "}
                  </h1>

                  <h1 className="text-lg pl-2">{pending}</h1>
                </div>
                <div className="flex">
                  <h1 className="text-yellow-500 font-bold text-lg">
                    cancel :{" "}
                  </h1>

                  <h1 className="text-lg pl-2">{cancel}</h1>
                </div>
                <div className="flex">
                  <h1 className="text-green-600 font-bold text-lg">
                    complete order :{" "}
                  </h1>

                  <h1 className="text-lg pl-2">{complete}</h1>
                </div>
                <div className="flex">
                  <h1 className="text-orange-600 font-bold text-lg">
                    payment complete :{" "}
                  </h1>

                  <h1 className="text-lg pl-2">{PaymentComplete}</h1>
                </div>
              </div>

              <PieChart width={400} height={300}>
                <Pie
                  data={pieData}
                  dataKey="value"
                  cx={250}
                  cy={150}
                  innerRadius={60}
                  outerRadius={100}
                  animationBegin={0}
                  animationDuration={1500}
                >
                  {pieData.map((entry, index) => (
                    <>
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    </>
                  ))}
                </Pie>
              </PieChart>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashborad;
