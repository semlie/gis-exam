import React, { useState, useEffect } from 'react';
const RegisterPage = ()=>{
  return <>
            <form>
                <input type="text" name="first_name" placeholder="שם פרטי" required/>
                <input type="text" name="last_name" placeholder="שם משפחה" required/>

                <button type="submit">שליחה</button>
            </form>
    </>
};
export default RegisterPage;