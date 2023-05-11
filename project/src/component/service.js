import axios from 'axios'

export function createMember(member) {
    
    axios.post("http://localhost:3500/addMember", member)
        .then(res => { console.log('create member succses:', JSON.stringify(res)); })
        .catch(err => { console.log('err:', err); })
}

export async function getAllMembers() {
    
    let data = await axios.get("http://localhost:3500/getAllMembers");
    return data;
}

export async function getMemberById() {
    debugger
    let data = await axios.get("http://localhost:3500/getMemberById/:id");
    return data;
}

