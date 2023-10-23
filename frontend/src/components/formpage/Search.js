import React, { useState } from 'react';

import Select from 'react-select';

import {stateOptions } from './data.js';

const options = [
    
    {value:'DGP',label:'DGP'},
  {value:'SSP_l&o',label:'SSP_l&o'},
  {value:'SP_north',label:'SP_north'},
  {value:'SP_mahe',label:'SP_mahe'},
  {value:'SP_east',label:'SP_east'},
  {value:'SP_west',label:'SP_west'},
  {value:'SP_yanam',label:'SP_yanam'},
  {value:'SP_south',label:'SP_south'},
  {value:'CI_muthialpet',label:'CI_muthialpet'},
  {value:'SHO_muthialpet',label:'SHO_muthialpet'},
  {value:'SHO_kalapet',label:'SHO_kalapet'},
  {value:'SHO_grandbazar',label:'SHO_grandbazar'},
  {value:'SHO_odeansalai',label:'SHO_odeansalai'},
  {value:'SHO_orleanpet',label:'SHO_orleanpet'},
  {value:'CI_mettupalayam',label:'CI_mettupalayam'},
  {value:'SHO_mettupalayam',label:'SHO_mettupalayam'},
  {value:'SHO_reddiyarpalayam',label:'SHO_reddiyarpalayam'},
  {value:'SHO_lawspet',label:'SHO_lawspet'},
  {value:'CI_dnagar',label:'CI_dnagar'},
  {value:'SHO_dnagar',label:'SHO_dnagar'},
  {value:'SHO_sedarapet',label:'SHO_sedarapet'},
  {value:'CI_villianur',label:'CI_villianur'},
  {value:'SHO_villianur',label:'SHO_villianur'},
  {value:'SHO_mangalam',label:'SHO_mangalam'},
  {value:'CI_nettapakkam',label:'CI_nettapakkam'},
  {value:'SHO_nettapakam',label:'SHO_nettapakam'},
  {value:'SHO_thirubhuvanai',label:'SHO_thirubhuvanai'},
  {value:'CI_thirukkanur',label:'CI_thirukkanur'},
  {value:'SHO_thirukkanur',label:'SHO_thirukkanur'},
  {value:'SHO_katterikuppam',label:'SHO_katterikuppam'},
  {value:'SHO_mudaliyarpet',label:'SHO_mudaliyarpet'},
  {value:'CI_ariyankuppam',label:'CI_ariyankuppam'},
  {value:'SHO_ariyankuppam',label:'SHO_ariyankuppam'},
  {value:'SHO_thavalakuppam',label:'SHO_thavalakuppam'},
  {value:'CI_bahour',label:'CI_bahour'},
  {value:'SHO_bahour',label:'SHO_bahour'},
  {value:'SHO_karikalampakkam',label:'SHO_karikalampakkam'},
  {value:'CI_yanam',label:'CI_yanam'},
  {value:'SHO_yanam',label:'SHO_yanam'},
  {value:'CI_mahe',label:'CI_mahe'},
  {value:'SHO_mahe',label:'SHO_mahe'},
  {value:'SHO_palloor',label:'SHO_palloor'},
  {value:'SP_ars',label:'SP_ars'},
  {value:'SP_ans',label:'SP_ans'},
  {value:'SP_coastalsecurity',label:'SP_coastalsecurity'},
  {value:'INSPECTOR_ars',label:'INSPECTOR_ars'},
  {value:'INSPECTOR_ans',label:'INSPECTOR_ans'},
  {value:'INSPECTOR_puducherry',label:'INSPECTOR_puducherry'},
  {value:'INSPECTOR_karaikal',label:'INSPECTOR_karaikal'},
  {value:'INSPECTOR_yanam',label:'INSPECTOR_yanam'},
  {value:'INSPECTOR_mahe',label:'INSPECTOR_mahe'},
  {value:'SSP_c&i',label:'SSP_c&i'},
  {value:'SP_cid&crb',label:'SP_cid&crb'},
  {value:'INSPECTOR_crb',label:'INSPECTOR_crb'},
  {value:'INSPECTOR_cid',label:'INSPECTOR_cid'},
  {value:'SP_sb',label:'SP_sb'},
  {value:'INSPECTORSB_pdy',label:'INSPECTORSB_pdy'},
  {value:'INSPECTORSB_pdy1',label:'INSPECTORSB_pdy1'},
  {value:'INSPECTORSB_kkl',label:'INSPECTORSB_kkl'},
  {value:'SP_sigmasecurity',label:'SP_sigmasecurity'},
  {value:'INSPECTOR_ss1',label:'INSPECTOR_ss1'},
  {value:'INSPECTOR_ss2',label:'INSPECTOR_ss2'},
  {value:'INSPECTOR_ss3',label:'INSPECTOR_ss3'},
  {value:'SP_sigmaintelligence',label:'SP_sigmaintelligence'},
  {value:'SP_pcr',label:'SP_pcr'},
  {value:'INSPECTOR_pcr',label:'INSPECTOR_pcr'},
  {value:'SSP_hq',label:'SSP_hq'},
  {value:'SP_hq',label:'SP_hq'},
  {value:'CHIEF_stores',label:'CHIEF_stores'},
  {value:'INSPECTOR_cs',label:'INSPECTOR_cs'},
  {value:'SP_pap',label:'SP_pap'},
  {value:'INSPECTOR_pap1',label:'INSPECTOR_pap1'},
  {value:'INSPECTOR_pap2',label:'INSPECTOR_pap2'},
  {value:'INSPECTOR_pap3',label:'INSPECTOR_pap3'},
  {value:'SP_pts&welfare',label:'SP_pts&welfare'},
  {value:'INSPECTOR_pts',label:'INSPECTOR_pts'},
  {value:'SP_mt',label:'SP_mt'},
  {value:'INSPECTOR_mt',label:'INSPECTOR_mt'},
  {value:'SP_hg',label:'SP_hg'},
  {value:'INSPECTOR_hg',label:'INSPECTOR_hg'},
  {value:'SSP_traffic',label:'SSP_traffic'},
  {value:'SP_ne',label:'SP_ne'},
  {value:'SHO_trafficeast',label:'SHO_trafficeast'},
  {value:'INSPECTOR_engcell',label:'INSPECTOR_engcell'},
  {value:'SHO_trafficnorth',label:'SHO_trafficnorth'},
  {value:'SP_sw',label:'SP_sw'},
  {value:'SHO_trafficsouth',label:'SHO_trafficsouth'},
  {value:'SHO_trafficwest',label:'SHO_trafficwest'},
  {value:'SP_cyperps',label:'SP_cyperps'},
  {value:'CYPER_inspector1',label:'CYPER_inspector1'},
  {value:'CYPER_inspector2',label:'CYPER_inspector2'},
  {value:'SP_cctns',label:'SP_cctns'},
  {value:'SP_wireless&ccr',label:'SP_wireless&ccr'},
  {value:'INSPECTOR_ccr1',label:'INSPECTOR_ccr1'},
  {value:'INSPECTOR_ccr2',label:'INSPECTOR_ccr2'}
  
];






const Search=(props)=> {
    const [selectedValue, setSelectedValue] = useState([]);
   
    const onChange = e =>{
        const selectedValues = e.map(item => item.value);
        setSelectedValue(selectedValues );

        const jsonArray = selectedValues.map((item, index) => {
          return { [`key_${index}`]: item, seen: 'false' };
        });
       console.log(jsonArray);
        props.func(JSON.stringify(jsonArray));
    }

    
  return (
    <>
    <Select options={stateOptions}
    isMulti
    className='basic-multi-select'
    classNamePrefix="select"
    name="usernames"
    onChange={onChange} 
    />
{selectedValue.map((ok)=>(
 <p>{ok}</p>
))}
    </>
  );
}

export default Search;