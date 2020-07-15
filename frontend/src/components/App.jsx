import React, {useEffect, useState} from "react";
import config from './../config/config';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

const App = () => {

  const [employees, setEmployees] = useState([]);
  const [listen, setListen] = useState(false);

  useEffect(() => {

    if(!listen){

        //use the EventSource API 
        //https://html.spec.whatwg.org/multipage/server-sent-events.html#the-eventsource-interface
        const sourceEvents = new EventSource(config.SUBSCRIBE_ENDPOINT);

        
        sourceEvents.onmessage = (sourceEvent) => {
          console.log(sourceEvent.data)
            setEmployees(JSON.parse(sourceEvent.data));
        };

        setListen(true);
    }
    
  }, [employees]);

  const getEmployeesAsJSON = () => {
    return employees.map((name, index) => {
       return {name: name, id: index }
    });
  }

  const render = () => {

    const columns = [
        {
            dataField: 'id',
            text: 'Employee ID'
        }, 
        {
            dataField: 'name',
            text: 'Employee Name'
        }
    ];


    return <BootstrapTable keyField='id' data={ getEmployeesAsJSON() } columns={ columns } />
  }

  return (
   <div className="d-flex justify-content-center mt-5">
    <div className="w-75">
        {render()}
    </div>
   </div>
  );
};

export default App;