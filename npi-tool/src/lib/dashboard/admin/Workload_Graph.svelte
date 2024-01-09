<script>
    export let graph_data, weeks, eng_dict;

    $: weeks = [...weeks];
</script>

<div class="container">
      <div class="chart">
      <div class="chart-row chart-period" style="grid-template-columns: 149px repeat({weeks.length}, 1fr);">
          <div class="chart-row-item"></div>
          {#each weeks as week}
            <span>{week}</span>
          {/each}
      </div>
      <div class="chart-row chart-lines" style="grid-template-columns: 150px repeat({weeks.length}, 1fr);">
        {#each weeks as week}
          <span></span>
        {/each}
      </div>
      {#each Object.keys(graph_data) as email}
        <div class="chart-row">
            <div class="chart-row-item">{eng_dict[email]}</div>
            <ul class="chart-row-bars" style="grid-template-columns: repeat({weeks.length}, 1fr);">
                {#each graph_data[email] as item}
                  {#if item.start_week < parseInt(weeks[weeks.length - 1].slice(1))}
                    <li style="grid-column: {item.start_week}/{item.end_week}">{item.title}</li>
                  {/if}
                {/each}
            </ul>
        </div>
      {/each}
    </div>
</div>

<style>
  .container {
      max-width: fit-content;
  }
 
  .chart {
      display: grid;
      position: relative;
  }
  .chart-row {
    display: grid;      
    grid-template-columns: 150px 1fr;
    background-color: #DCDCDC;
  }

  .chart-period {
    background-color:  #708090 !important;
    border-bottom: 2px solid #000; 
  }
  .chart-lines {
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: transparent;
  }
  .chart-period > span {    
    text-align: center;
    font-size: 13px;
    align-self: center;
    font-weight: bold;
    padding: 15px 0;    
  }
  .chart-lines > span {
    display: block;
    border-right: 1px solid rgba(0, 0, 0, 0.3);
  }
 
  .chart-row-item {
    background-color:#808080;
    border: 1px solid  #000;
    border-top: 0;
    border-left: 0;      
    padding: 20px 0;
    font-size: 15px;
    font-weight: bold;
    text-align: center;
  } 

  .chart-row-bars {
    list-style: none;
    display: grid;
    padding: 15px 0;
    margin: 0;
    
    grid-gap: 10px 0;
    border-bottom: 1px solid  #000;
  }
  li {
    font-weight: 450;
    text-align: left;
    font-size: 15px;
    min-height: 15px;
    background-color: #708090;
    padding: 5px 15px;
    color: #fff;
    overflow: hidden;
    position: relative;
    cursor: pointer;
    border-radius: 15px;
  }

</style>