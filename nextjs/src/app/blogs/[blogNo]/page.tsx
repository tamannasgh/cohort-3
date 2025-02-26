const page = ({params} : {params: {blogNo: string}}) => {
  const {blogNo} = params;
  return (
    <div className="text-2xl text-red-600">this is blogg no {blogNo}</div>
  )
}

export default page