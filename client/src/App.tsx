import { Switch, Route } from "wouter";
import Layout from "@/components/Layout";
import Home from "@/pages/home";
import Gallery from "@/pages/gallery";
import Search from "@/pages/search";
import NotFound from "@/pages/not-found";
import AboutPage from "@/pages/AboutPage";
import ProgramDetails from "@/pages/programs/[id]";
import NewsPage from "@/pages/news";
import DownloadPage from "@/pages/download";
import Staff from "@/pages/staff";
import Departments from "@/pages/depatment";
import ContactPage from "@/pages/ContactPage";
import CoursesPage from "@/pages/CoursesPage";
import CoursesPreview from "@/components/CoursesPreview";
import NewsDetail from "./pages/NewsDetail";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={AboutPage} />
        <Route path="/gallery" component={Gallery} />
        <Route path="/search" component={Search} />
        <Route path="/programs/:id" component={ProgramDetails} />
        <Route path="/news" component={NewsPage} />
        <Route path="/download" component={DownloadPage} />
        <Route path="/staff" component={Staff} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/news/:id" component={NewsDetail} /> {/* Dynamic news route */}
        {/* Courses */}
        <Route path="/courses" component={CoursesPage} />
        
        {/* Course Preview redirects to /courses */}
        <Route
          path="/coursePreview"
          component={() => {
            window.location.href = "/courses";
            return null;
          }}
        />

        <Route path="/departments" component={Departments} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

export default Router;
