import React, { useState, useEffect } from 'react'
import { useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef()
    const passwordref = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])

    const getPasswords = async () => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
        setpasswordArray(passwords)
    }

    useEffect(() => {
        getPasswords()
    }, [])

    const copyItem = (Text) => {
        toast(' Copied to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(Text)
    }

    const savePassword = async () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: form.id }) })
            setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            await fetch("http://localhost:3000/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, id: uuidv4() }) })

            // localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            // console.log([...passwordArray, form]);
            setform({ site: "", username: "", password: "" })
            toast('Password Saved !', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else {
            toast('Error: Password not Saved !')
        }
    }

    const deletePassword = async(id) => {
        console.log("delete", id);
        let c = confirm("Are you sure you want to delete this password ?")
        if (c) {
            setpasswordArray(passwordArray.filter(item => item.id != id))
            await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })
            toast('Password Deleted Successfully !', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    const editPassword = (id) => {
        setform({...passwordArray.filter(item => item.id === id)[0], id: id})
        setpasswordArray(passwordArray.filter(item => item.id !== id))
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const ShowPassword = () => {
        passwordref.current.type = "text"
        console.log(ref.current.src);
        if (ref.current.src.includes("icons/eye-closed.svg")) {
            ref.current.src = "icons/eye-opened.svg"
            passwordref.current.type = "password"
        }
        else {
            passwordref.current.type = "text"
            ref.current.src = "icons/eye-closed.svg"
        }
    }

    return (

        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <ToastContainer />
            <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full opacity-20 blur-[100px]"></div></div>
            <div className='p-3 md:myconatiner min-h-[80.8vh]'>
                <h1 className='text-4xl text font-bold text-center'>
                    <span className='text-white'>
                        AuraPulse
                    </span>
                </h1>
                <p className='text-purple-800 text-lg text-center'>
                    Your Own Password Manger!
                </p>
                <div className='text-white flex flex-col p-4 gap-9 items-center'>
                    <input value={form.site} onChange={handleChange} placeholder='Enter Website URL' className='bg-transparent opacity-400
            rounded-full border border-purple-700 w-full p-4 py-1' type="text" name='site' id='site' />
                    <div className='flex flex-col md:flex-row w-full justify-between gap-9'>
                        <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='bg-transparent opacity-400 rounded-full border border-purple-700 w-full p-4 py-1' type="text" name='username' id='username' /><div className='relative' />
                        <input ref={passwordref} value={form.password} onChange={handleChange} placeholder='Enter Password' className='bg-transparent opacity-400 rounded-full border border-purple-700 w-full p-4 py-1' type="password" name='password' id='password' /><span className='absolute right-[35Px] top-[223px] cursor-pointer' onClick={ShowPassword}>
                            <img ref={ref} className='p-1' width={30} src="icons/eye-opened.svg" />
                        </span>
                    </div>
                    <button onClick={savePassword} className='w-fit bg-transparent gap-2 opacity-400 rounded-full border border-purple-700 flex justify-center items-center p-4 py-1 hover:bg-purple-800 hover:ring-white ring-1'>
                        <lord-icon
                            src="https://cdn.lordicon.com/rcgrnzji.json"
                            trigger="hover"
                            stroke="bold"
                            state="hover-swirl"
                            className="width:250px;height:250px">
                        </lord-icon>
                        Add Password</button>
                </div>
                <div className="passwords px-10">
                    <h2 className='text-white py-4 flex justify-center items-center font-bold text-2xl'>Your Saved Passwords</h2>
                    {passwordArray.length === 0 && <div className='text-white mb-15'>No password to show</div>}
                    {passwordArray.length != 0 &&
                        <table className="table-auto w-full rounded-md overflow-hidden mb-15">
                            <thead className='bg-purple-900 text-white'>
                                <tr>
                                    <th className='py-2'>WebSite URL</th>
                                    <th className='py-2'>Username</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Refractor</th>
                                </tr>
                            </thead>
                            <tbody className='bg-purple-400'>
                                {passwordArray.map((item, index) => {
                                    return <tr key={index}>
                                        <td className=' py-2 border border-white text-center w-32'>
                                            <div className='flex items-center justify-center'>
                                                <a href={item.site} target="_blank">{item.site}</a>
                                                <div className='lordiconcopy size-6 cursor-pointer ' onClick={() => { copyItem(item.site) }}>
                                                    <lord-icon
                                                        style={{ "width": "20px", "height": "20px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                        src="https://cdn.lordicon.com/wzwygmng.json"
                                                        trigger="hover"
                                                        stroke="bold"
                                                        colors="primary:#121331,secondary:#000000">
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td >
                                        <td className='py-2 border border-white text-center w-32'><div className='flex items-center justify-center'>
                                            {item.username}
                                            <div className='lordiconcopy size-6 cursor-pointer ' onClick={() => { copyItem(item.username) }}>
                                                <lord-icon
                                                    style={{ "width": "20px", "height": "20px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/wzwygmng.json"
                                                    trigger="hover"
                                                    stroke="bold"
                                                    colors="primary:#121331,secondary:#000000">
                                                </lord-icon>
                                            </div>
                                        </div>
                                        </td >
                                        <td className='py-2 border border-white text-center w-32'><div className='flex items-center justify-center'>
                                            {"*".repeat(item.password.length)}
                                            <div className='lordiconcopy size-6 cursor-pointer ' onClick={() => { copyItem(item.password) }}>
                                                <lord-icon
                                                    style={{ "width": "20px", "height": "20px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/wzwygmng.json"
                                                    trigger="hover"
                                                    stroke="bold"
                                                    colors="primary:#121331,secondary:#000000">
                                                </lord-icon>
                                            </div>
                                        </div>
                                        </td >
                                        <td className='py-2 border border-white text-center w-32'>
                                            <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/wuvorxbv.json"
                                                    trigger="hover"
                                                    stroke="bold"
                                                    state="hover-line"
                                                    colors="primary:#121331,secondary:#000000"
                                                    style={{ "width": "20px", "height": "20px" }}>
                                                </lord-icon>
                                            </span>
                                            <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/drxwpfop.json"
                                                    trigger="hover"
                                                    stroke="bold"
                                                    colors="primary:#121331,secondary:#000000"
                                                    style={{ "width": "20px", "height": "20px" }}>
                                                </lord-icon>
                                            </span>
                                        </td >
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    }
                </div>
            </div>
        </>
    )
}

export default Manager
