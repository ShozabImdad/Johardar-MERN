const cookieConfig = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // true in production
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  };


  export default cookieConfig;