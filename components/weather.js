import React from "react";

export class WeatherComponent extends React.Component{
    constructor() {
        super();
        this.state = {
            temp : '',
            humidity : '',
            image : '',
            name:'',
            region:'',
            data : null,
        }
      
      }

      componentDidMount(){
        this.GetIt();
      }

      GetIt(){
        fetch('https://api.apixu.com/v1/current.json?key=e7ab3fccbda843c8b4485021192303&q=Wollongong')
       .then(res => res.json())
       .then(data => this.setState({
           data,
           image : data.current.condition.icon,
           temp : data.current.temp_c,
           name: data.location.name,
           region: data.location.region
         }
         ));
     }

    render(){
        return(
          <div className="weatherDiv">
              
              <div>
               <div>Current temperature: {this.state.temp}&#8451;</div>
               <div>{this.state.name}</div>
               <div>{this.state.region}</div>
             
              </div>
              
              <div>
              <img src={this.state.image} width={'120px'} height={'120px'}></img>
              </div>
               
          </div>  
        );
    }
}