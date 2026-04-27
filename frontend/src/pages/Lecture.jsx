import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { server } from "../main";
import axios from "axios";
import { Skeleton } from "../components/Skeleton";
import toast from "react-hot-toast";
import { RiCheckLine } from "react-icons/ri";

function Lecture({ user }) {
  const [lectures, setLectures] = useState([]);
  const [lecture, setLecture] = useState({});
  const [loading, setLoading] = useState(true);
  const [lecLoading, setLecLoading] = useState(false);
  const [timeline, setTimeline] = useState([]);
  const [progressPercent, setProgressPercent] = useState(0);
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [video, setVideo] = useState("")
  const [videoPreview, setVideoPreview] = useState("")
  const [btnLoading , setBtnLoading] = useState("")
  const navigate = useNavigate()
  const params = useParams();

  async function fetchLectures() {
    try {
      const { data } = await axios.get(
        `${server}/course/lectures/${params.id}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setLectures(data.lectures);
      setLoading(false);
      fetchProgress();
    } catch (err) {
      console.log(err);
      setLoading(true);
    }
  }

  async function fetchProgress() {
      try {
          const { data } = await axios.get(`${server}/course/${params.id}/progress`, {
              headers: { token: localStorage.getItem("token") }
          });
          setTimeline(data.timeline || []);
          setProgressPercent(data.progress || 0);
      } catch (error) {
          console.log("Failed to fetch progress", error);
      }
  }

  async function fetchLecture(id) {
    setLecLoading(true);
    try {
      const { data } = await axios.get(`${server}/course/lecture/${id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setLecture(data.lecture);
      setLecLoading(false);
    } catch (err) {
      console.log(err);
      setLecLoading(false);
    }
  }

  useEffect(() => {
    fetchLectures();
  }, []);

  const submitHandler = async (e)=>{
    setBtnLoading(true)
    e.preventDefault()

    const myForm = new FormData()
    myForm.append("title" , title)
    myForm.append("description" , description)
    myForm.append("file" , video)

    try{
        const {data} = await axios.post(`${server}/admin/course/${params.id}` , myForm  ,{
          headers : {
            token : localStorage.getItem("token")
          }
        })
        toast.success(data.message)
        setBtnLoading(false)
        setShow(false)
        fetchLectures()
          setTitle("")
          setDescription("")
    }
    catch(err){
      toast.error(err.response?.data?.message || err.message)
      setBtnLoading(false)
    }
  }

  const deleteHandler = async  (id)=>{
    if(confirm("Are You Sure , You Want To Delete This Lecture")){
      try{
        const {data} = await axios.delete(`${server}/admin/lecture/${id}` , {
          headers  : {
            token : localStorage.getItem("token")
          }
        })
        toast.success(data.message)
        fetchLectures()
      }catch(err){
        toast.error(err.response?.data?.message || err.message)
      }
    }
  }

  const changeVideoHandler = (e) => {
    const file = e.target.files[0];
    const videoURL = URL.createObjectURL(file);
    setVideoPreview(videoURL);
    setVideo(file);
  };

  const markCompletedHandler = async () => {
      try {
          const { data } = await axios.post(`${server}/course/progress`, {
              courseId: params.id,
              lectureId: lecture._id
          }, {
              headers: { token: localStorage.getItem("token") }
          });
          toast.success(data.message);
          setTimeline(data.timeline);
          setProgressPercent(data.progress);
      } catch (error) {
          toast.error(error.response?.data?.message || "Failed to update progress");
      }
  };

  const isCompleted = (lecId) => {
      return timeline.some(t => t.lectureId === lecId && t.completed);
  };

  return (
    <div className="bg-background min-h-screen pt-28 px-4 md:px-8 pb-10">
      {loading ? (
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-8 items-start">
          <div className="lg:w-[70%] w-full bg-card border border-border shadow-sm rounded-3xl p-6 md:p-8 flex flex-col">
            <Skeleton className="w-full aspect-video rounded-2xl" />
            <Skeleton className="w-3/4 h-10 mt-8" />
            <Skeleton className="w-full h-32 mt-6 rounded-2xl" />
          </div>
          <div className="lg:w-[30%] w-full flex flex-col gap-6 sticky top-28 h-[calc(100vh-140px)]">
            <div className="bg-card border border-border shadow-sm rounded-3xl p-6 flex-1 flex flex-col">
              <Skeleton className="w-1/2 h-6 mb-6" />
              <div className="space-y-4">
                <Skeleton className="w-full h-16 rounded-2xl" />
                <Skeleton className="w-full h-16 rounded-2xl" />
                <Skeleton className="w-full h-16 rounded-2xl" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-8 items-start">
          {/* Main Content Area */}
          <div className="lg:w-[70%] w-full bg-card border border-border shadow-sm rounded-3xl p-4 md:p-6 flex flex-col">
            {lecLoading ? (
              <div className="flex flex-col">
                <Skeleton className="w-full aspect-video rounded-2xl" />
                <Skeleton className="w-3/4 h-10 mt-8" />
                <Skeleton className="w-full h-32 mt-6 rounded-2xl" />
              </div>
            ) : lecture.video ? (
              <div className="flex flex-col">
                <div className="relative w-full rounded-2xl overflow-hidden bg-black flex items-center justify-center aspect-video">
                  <video
                    width="100%"
                    height="100%"
                    controls
                    controlsList="nodownload noremoteplayback"
                    disabledPictureInPicture
                    disableRemotePlayback
                    autoPlay
                    src={`${server}/${lecture.video}`}
                    className="w-full h-full object-contain"
                  ></video>
                </div>
                
                <div className="mt-8 px-2">
                  <h1 className="text-2xl md:text-4xl font-semibold text-foreground mb-4 leading-tight">{lecture.title}</h1>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
                      <div className="flex items-center gap-3">
                          {/* Placeholder for Instructor Info similar to YouTube Channel */}
                          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                              E
                          </div>
                          <div>
                              <h3 className="text-sm font-medium text-foreground">EaseLearn Academy</h3>
                              <p className="text-xs text-muted-foreground">Course Instructor</p>
                          </div>
                      </div>

                      {isCompleted(lecture._id) ? (
                          <div className="flex items-center gap-2 text-sm bg-primary/10 text-primary px-5 py-2.5 rounded-full font-medium border border-primary/20">
                              <RiCheckLine size={20} /> Completed
                          </div>
                      ) : (
                          <button 
                              onClick={markCompletedHandler}
                              className="text-sm bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2.5 rounded-full transition-colors font-medium shadow-sm hover:shadow-md"
                          >
                              Mark as Completed
                          </button>
                      )}
                  </div>

                  {/* YouTube Style Description Box */}
                  <div className="mt-6 bg-muted/40 hover:bg-muted/60 transition-colors p-5 rounded-2xl border border-border/50">
                      <h4 className="text-sm font-bold text-foreground mb-2">Description & Notes</h4>
                      <p className="text-sm md:text-base text-foreground/80 leading-relaxed whitespace-pre-wrap font-light">{lecture.description}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col justify-center items-center text-center p-10 h-full">
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
                  <svg className="w-10 h-10 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <h1 className="text-2xl font-light text-foreground mb-2">Select a Lecture</h1>
                <p className="text-muted-foreground">Choose a lecture from the sidebar to start learning.</p>
              </div>
            )}
          </div>

          {/* Sidebar Area */}
          <div className="lg:w-[30%] w-full flex flex-col gap-6 lg:sticky lg:top-28 lg:h-[calc(100vh-140px)]">
            
            {/* Admin Add Lecture Panel */}
            {user && user.role === "admin" && (
              <div className="bg-card border border-border shadow-sm rounded-3xl p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-light text-foreground">Manage Lectures</h2>
                  <button
                    onClick={() => setShow(!show)}
                    className="text-sm bg-primary hover:bg-primary/90 text-primary-foreground py-1.5 px-4 rounded-full transition-colors font-light"
                  >
                    {show ? "Cancel" : "Add New"}
                  </button>
                </div>

                {show && (
                  <div className="pt-4 border-t border-border mt-2 animate-in fade-in slide-in-from-top-4">
                    <form onSubmit={submitHandler} className="space-y-4">
                      <div>
                        <label className="block text-sm font-light text-foreground mb-1">Lecture Title</label>
                        <input
                          value={title}
                          onChange={(e)=> setTitle(e.target.value)}
                          type="text"
                          placeholder="e.g. Introduction to React"
                          className="w-full bg-input border border-border text-foreground px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-light text-foreground mb-1">Description</label>
                        <textarea
                          value={description}
                          onChange={(e)=> setDescription(e.target.value)}
                          placeholder="What will students learn?"
                          className="w-full bg-input border border-border text-foreground px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-ring transition-all min-h-[80px]"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-light text-foreground mb-1">Video File</label>
                        <input
                          onChange={changeVideoHandler}
                          type="file"
                          accept="video/*"
                          className="w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-light file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition-all cursor-pointer"
                          required
                        />
                        {videoPreview && (
                          <div className="mt-3 rounded-lg overflow-hidden border border-border">
                            <video src={videoPreview} className="w-full h-auto" controls />
                          </div>
                        )}
                      </div>
                      <button
                        disabled={btnLoading}
                        type="submit"
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-light py-2.5 rounded-xl transition-all shadow-sm disabled:opacity-50 mt-2"
                      >
                        {btnLoading ? "Uploading..." : "Upload Lecture"}
                      </button>
                    </form>
                  </div>
                )}
              </div>
            )}

            {/* Lecture Playlist */}
            <div className="bg-card border border-border shadow-sm rounded-3xl p-6 flex-1 flex flex-col min-h-0">
              
              {/* Sidebar Header with Circular Progress */}
              <div className="mb-6 pb-6 border-b border-border">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-light text-foreground">Course Content</h2>
                  <span className="text-xs font-light bg-muted text-muted-foreground px-2.5 py-1 rounded-full">{lectures.length} lessons</span>
                </div>
                
                {/* Circular Progress Indicator */}
                <div className="flex items-center gap-4 bg-muted/30 p-4 rounded-2xl border border-border/50">
                  <div className="relative w-14 h-14 shrink-0">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <circle
                        cx="18"
                        cy="18"
                        r="16"
                        fill="none"
                        className="stroke-muted"
                        strokeWidth="3"
                      />
                      <circle
                        cx="18"
                        cy="18"
                        r="16"
                        fill="none"
                        className="stroke-primary"
                        strokeWidth="3"
                        strokeDasharray="100"
                        strokeDashoffset={100 - progressPercent}
                        strokeLinecap="round"
                        style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-medium text-foreground">{progressPercent}%</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-foreground">Your Progress</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{progressPercent === 100 ? 'Course Completed!' : 'Keep going, you are doing great!'}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-2">
                {lectures && lectures.length > 0 ? (
                  lectures.map((e, i) => (
                    <div key={e._id} className="group relative">
                      <div
                        onClick={() => fetchLecture(e._id)}
                        className={`p-4 cursor-pointer rounded-2xl flex items-start gap-4 transition-all duration-200 ${
                          lecture._id === e._id
                            ? "bg-primary text-primary-foreground shadow-md"
                            : "bg-muted/50 hover:bg-muted text-foreground border border-transparent hover:border-border"
                        }`}
                      >
                        <div className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center text-xs font-light shrink-0 ${lecture._id === e._id ? 'bg-primary-foreground/20 text-primary-foreground' : 'bg-background text-muted-foreground border border-border'}`}>
                           {isCompleted(e._id) ? <RiCheckLine className="text-primary w-4 h-4" /> : i + 1}
                        </div>
                        <div className="flex-1">
                          <h3 className={`font-light line-clamp-2 ${lecture._id === e._id ? 'text-primary-foreground' : 'text-foreground'}`}>
                            {e.title}
                          </h3>
                        </div>
                      </div>
                      
                      {user && user.role === "admin" && (
                        <button 
                          onClick={(ev) => { ev.stopPropagation(); deleteHandler(e._id); }} 
                          className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 bg-destructive hover:bg-destructive/90 text-destructive-foreground p-2 rounded-xl shadow-sm transition-all"
                          title="Delete Lecture"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        </button>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground space-y-3">
                    <svg className="w-12 h-12 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                    <p>No content available yet.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Lecture;
