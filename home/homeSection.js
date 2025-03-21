function home_page() {
    if (!sessionStorage.getItem("home_page_refreshed")) {
        sessionStorage.setItem("home_page_refreshed", "true");
        location.reload(); 
        return; 
    }
    sessionStorage.setItem("home_page_refreshed","");
    let catagorydata=update_expenses_summary("home_chart1",document.getElementById("home_summary1"))
    let previousvalue=update_expenses_summary1("home_chart2",document.getElementById("home_summary2"))
    let chart_home;
    let summary_data=expensegetuserfn()
    if(summary_data.length > 0 && summary_data[0].expenses.length){
        document.getElementById("no_data_home").style.display="none";
        document.getElementById("Home_con").style.display="block";
        [catagory,chat_summary]=sumary_data_calcutation(summary_data,document.getElementById("home_summary3"))
        update_expenses_piechart(catagory,"home_chart3",chart_home)
    }
    else
    {
        document.getElementById("home_summary3").innerHTML=""
        document.getElementById("no_data_home").style.display="block";
        document.getElementById("Home_con").style.display="none";
    }
    let current =  document.getElementById("current");
    let previous = document.getElementById("previous")
    if(catagorydata || !(Object.keys(catagorydata).length))
        current.style.display="none"
    else
        current.style.display="block"
    if(!previousvalue)
        previous.style.display = "none"
    else
        previous.style.display="block"
}