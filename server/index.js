import express from 'express';
import cors from 'cors';
import loginpage from './routes/login/login.js'
import dbconncetion from './db/db.js';
import bcrypt from 'bcrypt'
import User from './model/user.js'
import addemproyee from './routes/emproyeemodule/addemproyee.js'
import updateemproyee from './routes/emproyeemodule/updateemproyee.js'
import searchemproyee from './routes/emproyeemodule/seacrchemproyee.js'
import employeelist from './routes/emproyeemodule/emproyeelist.js'
import applyleave from './routes/leavemodule/applyleave.js'
import deleteleave from './routes/leavemodule/deleteleave.js'
import empleaves from './routes/leavemodule/empleave.js'
import leavelist from './routes/leavemodule/leavelist.js'
import updateleave from './routes/leavemodule/updateleave.js'
import addjob from './routes/recurmentmodule/addjob.js'
import applicationlist from './routes/recurmentmodule/applicationlist.js'
import closejob from './routes/recurmentmodule/closejob.js'
import jobapply from './routes/recurmentmodule/jobapply.js'
import listjob from './routes/recurmentmodule/listjob.js'
import updateapplication from './routes/recurmentmodule/updateapplication.js'
import updatejob from './routes/recurmentmodule/updatejob.js'
import usercreate from './routes/login/usercreate.js'
import byid from './routes/emproyeemodule/byid.js'
import mark from "./routes/attendence/mark.js"
import attendancerecord from './routes/attendence/record.js'
import byemp from './routes/attendence/byemp.js'


const app=express();
app.use(cors());
app.use(express.json())


app.use("/createuser", usercreate);

app.use("/leavelist",leavelist)
app.use("/updateleave",updateleave)
app.use("/addjob",addjob)
app.use("/applicationlist",applicationlist)
app.use("/closejob",closejob)
app.use("/jobapply",jobapply)
app.use("/listjob",listjob)
app.use("/updateapplication",updateapplication)
app.use("/updatejob",updatejob)
app.use("/login",loginpage);
app.use("/addemp",addemproyee);
app.use("/searchemp",searchemproyee);
app.use("/updateemp",updateemproyee)
app.use("/listemp",employeelist)
app.use("/applyleave",applyleave)
app.use("/deleteleave",deleteleave)
app.use("/byid",byid);
app.use("/mark",mark)
app.use("/record",attendancerecord)
app.use("/empleave",empleaves)

app.use("/byemp",byemp)


app.listen(5000,()=>{
    console.log("server is working")
})